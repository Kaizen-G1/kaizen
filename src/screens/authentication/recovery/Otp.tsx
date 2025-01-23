import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the checkmark icon
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

export default function PasswordRecoveryScreen() {
  const [selectedMethod, setSelectedMethod] = useState("SMS");
  const [otp, setOtp] = useState(["", "", "", ""]); // To store OTP values

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual avatar URL
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>
        Enter 4 digits code we sent you on your phone number
      </Text>

      {/* Method Selection */}
      <Text style={styles.selectedMethodText}>
        Method Selected: {selectedMethod}
      </Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Option to select SMS or Email
      <View style={styles.methodSelectionContainer}>
        <TouchableOpacity onPress={() => setSelectedMethod('SMS')} style={styles.methodButton}>
          <Text style={styles.methodText}>SMS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedMethod('Email')} style={styles.methodButton}>
          <Text style={styles.methodText}>Email</Text>
        </TouchableOpacity>
      </View> */}

      {/* Next Button */}
      {/* <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Send Again</Text>
      </TouchableOpacity> */}
      <View style={{ marginTop: 150 }}>
        <CustomButton
          label="Send Again"
          paddingHorizontal={100}
          onPress={() => alert("Send Again")}
        />
      </View>

      {/* Cancel Text */}
      <TouchableOpacity>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "center", // Vertically centers content
    alignItems: "center", // Horizontally centers content
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 19,
    textAlign: "center",
    marginBottom: 20,
    color: "#6E6E6E",
  },
  selectedMethodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220, // Adjust width for OTP inputs
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 0,
    marginTop: 10,
    borderColor: "#D8BD8A",
    textAlign: "center",
    opacity: 0.4,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#D8BD8A",
  },
  methodSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  methodButton: {
    backgroundColor: "#FFF8E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  nextButton: {
    marginTop: 138,
    backgroundColor: "#A5642A",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 335,
    height: 60,
  },
  nextButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "medium",
  },
  cancelText: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 14,
    color: "#6E6E6E",
  },
});
