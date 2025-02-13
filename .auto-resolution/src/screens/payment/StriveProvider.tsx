import React, { useEffect, useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

import { io } from "socket.io-client";

import { useIsFocused } from "@react-navigation/native";
import http from "../../services/httpService";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";

const SOCKET_URL = "http://localhost:3000/api/v1/payments/webhook";

type Props = StackScreenProps<RootStackParamList, "StripePayment">;

const StripePaymentScreen: React.FC<Props> = ({ route }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const socket = io(SOCKET_URL);

      socket.on("payment-success", (data) => {
        console.log("Payment successful!", data);
        setPaymentStatus("Payment Completed!");
        Alert.alert(
          "Payment Successful!",
          `Payment ID: ${data.paymentIntentId}`
        );
      });

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  const fetchPaymentIntent = async () => {
    const { total } = route.params;

    setLoading(true);
    try {
      const response = await http.post(
        `api/v1/payments/create-payment-intent`,
        {
          orderId: "67bea8c61e62ce46ed7efb04",
          amount: total,
        }
      );

      const { clientSecret } = response.data;

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Kaizen",
      });

      if (!error) {
        openPaymentSheet();
      }
    } catch (error) {
      console.error("Error fetching payment intent:", error);
    }
    setLoading(false);
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log("Payment failed", error);
    } else {
      console.log("Payment successful!");
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51R0lR8H8cqL7ypGhRQPKAMDcae5QQLc4qNbLM3UV9GAmbq8aj9N6urpZnOu8DNEdgZJBTjVDYBRaUIf3D9R6Dh5U00hHzWkmrz">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Stripe Payment</Text>
        <Button
          title="Pay Now"
          onPress={fetchPaymentIntent}
          disabled={loading}
        />
      </View>
    </StripeProvider>
  );
};

export default StripePaymentScreen;
