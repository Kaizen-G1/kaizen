import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import AlertModal from "../AlertCustomModal";

const PaymentScreen: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePayment = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleTrackOrder = () => {
    setShowSuccessModal(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Charge Card" onPress={handlePayment} />

      <AlertModal
        title="Success"
        isLoading={true}
        visible={showSuccessModal}
        message="Your card has been successfully charged"
      />
    </View>
  );
};

export default PaymentScreen;
