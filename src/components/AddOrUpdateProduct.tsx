import React, { useState, useEffect } from "react";
import { ScrollView, View, Alert, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../RootNavigator";

import { useAppDispatch, useAppSelector } from "../services/constants";
import { saveProductThunk } from "../screens/vendors/product/slice/ProductSlice";

import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

import AlertModal from "./alert/AlertCustomModal";

type Props = StackScreenProps<RootStackParamList, "AddProduct">;

interface ProductForm {
  title: string;
  description: string;
  inStock: number;
  price: number;
  discount: number;
  images: string[];
  costPrice: number;
  lowStockWarning: number;
  category: string;
  unit: string;
  vendorId: string;
}

const AddOrUpdateProduct: React.FC<Props> = ({ navigation, route }) => {
  const { mode, initialData } = route.params;

  const dispatch = useAppDispatch();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { loading, success } = useAppSelector(
    (state) => state.product.productSave
  );

  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    inStock: 0,
    price: 0,
    discount: 0,
    images: [],
    costPrice: 0,
    lowStockWarning: 0,
    category: "",
    unit: "",
    vendorId: "",
  });

  useEffect(() => {
    if (mode === "update" && initialData) {
      setForm({
        ...initialData,
        images: initialData.images || [],
      });
    }
  }, [mode, initialData, loading, success]);

  const handleChange = (key: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = () => {
    const sampleImage = "https://img.icons8.com/ios/50/000000/image.png";
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, sampleImage],
    }));
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
    dispatch(saveProductThunk(form));
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, backgroundColor: "#fff" }}
    >
      <AlertModal
        title={!success ? "Failed" : "Success"}
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
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        {mode === "add" ? "Add Product" : "Update Product"}
      </Text>

      {/* Form Inputs */}
      {Object.entries(form).map(([key, value]) =>
        key !== "images" ? (
          <TextInput
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={String(value)}
            onChangeText={(text) =>
              handleChange(key as keyof ProductForm, text)
            }
            keyboardType={typeof value === "number" ? "numeric" : "default"}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />
        ) : null
      )}

      {/* Image Upload */}
      <TouchableOpacity
        style={{
          height: 150,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
          backgroundColor: "#f0f0f0",
        }}
        onPress={handleImageUpload}
      >
        <Image
          style={{ width: 40, height: 40, marginBottom: 8 }}
          source={{ uri: "https://img.icons8.com/ios/50/000000/image.png" }}
        />
        <Text>Upload Product Image</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <CustomButton
        label={mode === "add" ? "Add Product" : "Update Product"}
        onPress={handleSubmit}
      />
      {/* <Button mode="contained" onPress={handleSubmit} loading={loading}>
        {mode === "add" ? "Add Product" : "Update Product"}
      </Button> */}
    </ScrollView>
  );
};

export default AddOrUpdateProduct;
