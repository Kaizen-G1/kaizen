import React, { useState, useEffect } from "react";
import { ScrollView, View, Alert, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../RootNavigator";
import { useAppDispatch, useAppSelector } from "../services/constants";
import {
  deleteProductThunk,
  ProductPayload,
  saveProductThunk,
} from "../screens/vendors/product/slice/ProductSlice";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";
import AlertModal from "./alert/AlertCustomModal";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { SaveFormat } from "expo-image-manipulator";
import {
  getCategoryByIdThunk,
  resetSelectedCategory,
  setSelectedCategory,
} from "../screens/category/slice/CategorySlice";

import { useIsFocused, useFocusEffect } from "@react-navigation/native";

type Props = StackScreenProps<RootStackParamList, "AddProduct">;

const AddOrUpdateProduct: React.FC<Props> = ({ navigation, route }) => {
  const { mode, initialData } = route.params;
  const dispatch = useAppDispatch();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { loading, success } = useAppSelector(
    (state) => state.product.productSave
  );
  const { selectedCategory, categoryById } = useAppSelector(
    (state) => state.category
  );

  const isFocused = useIsFocused();

  const [form, setForm] = useState<ProductPayload>({
    title: "",
    description: "",
    inStock: 0,
    price: 0,
    discount: 0,
    images: [],
    costPrice: 0,
    lowStockWarning: 0,
    subCategoryId: "",
    unit: "",
    vendorId: "",
  });

  useEffect(() => {
    if (isFocused && initialData?.subCategoryId) {
      dispatch(getCategoryByIdThunk(initialData.subCategoryId));
    }
  }, [isFocused, initialData, dispatch]);

  useEffect(() => {
    if (categoryById.response?.data) {
      dispatch(setSelectedCategory(categoryById.response.data.category));
    }
  }, [categoryById.response, dispatch]);

  useEffect(() => {
    if (selectedCategory?.id) {
      setForm((prev) => ({
        ...prev,
        subCategoryId: selectedCategory.id,
      }));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (mode === "update" && initialData) {
      setForm({
        ...initialData,
        images: initialData.images || [],
      });
    }
  }, [mode, initialData]);

  const handleChange = (key: keyof ProductPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const compressImageAsync = async (uri: string) => {
    try {
      const manipulatedResult = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { compress: 0.5, format: SaveFormat.JPEG }
      );
      return manipulatedResult.uri;
    } catch (error) {
      console.error("Error compressing image:", error);
      return uri;
    }
  };

  const handlePickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Permission to access the media library is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const originalUri = result.assets[0].uri;
      const compressedUri = await compressImageAsync(originalUri);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, compressedUri],
      }));
    }
  };

  const handleCaptureImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Permission to access the camera is required!"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const originalUri = result.assets[0].uri;
      const compressedUri = await compressImageAsync(originalUri);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, compressedUri],
      }));
    }
  };

  const handleSubmit = async () => {
    if (form.title.trim() === "") {
      Alert.alert("Error", "Please enter a title for the product.");
      return;
    } else if (form.price <= 0) {
      Alert.alert("Error", "Please enter a valid price for the product.");
      return;
    }

    setShowSuccessModal(true);
    dispatch(saveProductThunk(form));
    dispatch(resetSelectedCategory());
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    setForm((prev) => ({ ...prev, images: updatedImages }));
  };

  const deleteProduct = () => {
    if (mode === "update") {
      setShowSuccessModal(true);
      dispatch(deleteProductThunk(form.id!));
    }
  };

  return (
    <ScrollView
      style={{
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <AlertModal
        title={!success ? "Failed" : loading ? "Loading" : "Success"}
        visible={showSuccessModal}
        isError={!success}
        isLoading={loading}
        message={
          !success
            ? "Product Creation Failed"
            : mode === "add"
            ? "Product Created Successfully"
            : "Product Updated Successfully"
        }
        btnlabel={success ? "Go Back" : "Retry"}
        onPress={() => {
          if (success) {
            setShowSuccessModal(false);
            navigation.goBack();
          } else {
            setShowSuccessModal(false);
          }
        }}
      />

      <Text
        variant="headlineMedium"
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        {mode === "add" ? "Add Product" : "Update Product"}
      </Text>

      {/* Image Upload Section */}
      <View style={{ marginBottom: 16, flexDirection: "row" }}>
        {form.images.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 8 }}
          >
            {form.images
              .slice()
              .reverse()
              .map((imgUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imgUri }}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 8,
                    borderRadius: 8,
                  }}
                />
              ))}
          </ScrollView>
        )}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Button
            mode="outlined"
            onPress={handlePickImage}
            style={{ flex: 1, marginRight: 4 }}
          >
            Pick Image
          </Button>
          <Button
            mode="outlined"
            onPress={handleCaptureImage}
            style={{ flex: 1, marginLeft: 4 }}
          >
            Capture Image
          </Button>
        </View>
      </View>

      {/* Form Inputs */}
      {Object.entries(form).map(([key, value]) =>
        key !== "images" &&
        key !== "id" &&
        key !== "createdDate" &&
        key !== "vendorId" &&
        key !== "subCategoryId" &&
        key !== "updatedDate" ? (
          <TextInput
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={String(value)}
            onChangeText={(text) =>
              handleChange(key as keyof ProductPayload, text)
            }
            keyboardType={typeof value === "number" ? "numeric" : "default"}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />
        ) : null
      )}

      {/* Category Selection */}
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          backgroundColor: "#f9f9f9",
          marginBottom: 12,
        }}
        onPress={() => navigation.navigate("Category")}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>
          {selectedCategory?.name || "Select Category"}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: mode !== "add" ? "space-between" : "center",
          marginTop: 5,
        }}
      >
        <CustomButton
          label={mode === "add" ? "Add Product" : "Update Product"}
          onPress={handleSubmit}
        />
        {mode === "update" && (
          <CustomButton
            label="Delete Product"
            type="primary"
            onPress={() => {
              console.log(form.subCategoryId);
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default AddOrUpdateProduct;
