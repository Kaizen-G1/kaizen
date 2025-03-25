import React, { useState, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../RootNavigator";

import { useAppDispatch, useAppSelector } from "../../../services/constants";
import { saveVendorThunk } from "./slice/VendorSlice";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";
import AlertModal from "../../../components/alert/AlertCustomModal";

type Props = StackScreenProps<RootStackParamList, "AddOrUpdateVendor">;

interface VendorForm {
  name: string;
  email: string;
  address: string;
  shipping_time: string;
  business_number: string;
  status: string;
  bank_account_number: string;
}

const AddOrUpdateVendorDetail: React.FC<Props> = ({ navigation, route }) => {
  const { mode, initialData } = route.params;
  const dispatch = useAppDispatch();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { loading, success } = useAppSelector(
    (state) => state.vendor.vendorSave
  );

  const [form, setForm] = useState<VendorForm>({
    name: "",
    email: "",
    address: "",
    shipping_time: "",
    business_number: "",
    status: "",
    bank_account_number: "",
  });

  useEffect(() => {
    if (mode === "update" && initialData) {
      setForm({ ...initialData });
    }
  }, [mode, initialData, loading, success]);

  const handleChange = (key: keyof VendorForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.address || !form.business_number) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    dispatch(saveVendorThunk(form));
    setShowSuccessModal(true);
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
        title={!success ? "Failed" : "Success"}
        visible={showSuccessModal}
        isError={!success}
        isLoading={loading}
        message={
          !success
            ? "Vendor Creation Failed"
            : mode === "add"
            ? "Vendor Created Successfully"
            : "Vendor Updated Successfully"
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
        {mode === "add" ? "Add Vendor" : "Update Vendor"}
      </Text>

      {/* Form Inputs */}
      {Object.entries(form).map(([key, value]) =>
        key !== "_id" && key !== "customer_id" ? (
          <TextInput
            key={key}
            disabled={
              (mode === "update" && key === "updated_date") ||
              key === "created_date"
            }
            label={key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
            autoCapitalize={key === "name" ? "words" : "none"}
            value={String(value)}
            onChangeText={(text) => handleChange(key as keyof VendorForm, text)}
            keyboardType={
              key.includes("number")
                ? "numeric"
                : key === "email"
                ? "email-address"
                : "default"
            }
            mode="outlined"
            style={{ marginBottom: 12 }}
          />
        ) : null
      )}

      {/* Submit Button */}
      <CustomButton
        label={mode === "add" ? "Add Vendor" : "Update Vendor"}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

export default AddOrUpdateVendorDetail;
