import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../services/constants";
import { verify2FA } from "../slice/AuthSlice";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";

type Props = {
  navigation: any;
  route: any;
};

export default function OTPScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const [selectedMethod, setSelectedMethod] = useState<string>("SMS");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);

  const dispatch = useAppDispatch();
  const { loading, error, success, response } = useAppSelector(
    (state) => state.auth.verify2FA
  );

  useEffect(() => {
    if (error) {
      Alert.alert("Registration Failed", error, [{ text: "OK" }]);
    }
    if (success && response?.status === "success") {
      navigation.navigate("Login");
    }
  }, [success, response, navigation, error]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = otp.join("");
    if (enteredCode.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }
    dispatch(verify2FA({ code: enteredCode, customerEmail: email }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
        </View>
      </View>

      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code we sent to your {selectedMethod}
      </Text>

      <Text style={styles.selectedMethodText}>
        Method Selected: {selectedMethod}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el!)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            returnKeyType={index === otp.length - 1 ? "done" : "next"}
          />
        ))}
      </View>

      <View style={{ marginTop: 50 }}>
        <CustomButton
          label="Verify OTP"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>

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
    justifyContent: "center",
    alignItems: "center",
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
    gap: 10,

    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#D8BD8A",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#FFF8E5",
  },
  cancelText: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 14,
    color: "#6E6E6E",
  },
});
