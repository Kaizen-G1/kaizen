import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the checkmark icon

export default function PasswordRecoveryScreen() {
  const [selectedMethod, setSelectedMethod] = useState("SMS");

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
        How you would like to reset your password?
      </Text>

      {/* SMS Option */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedMethod === "SMS" && styles.selectedOption,
        ]}
        onPress={() => setSelectedMethod("SMS")}
      >
        <Text
          style={[
            styles.optionText,
            selectedMethod === "SMS" && styles.selectedText,
          ]}
        >
          SMS
        </Text>
        {selectedMethod === "SMS" ? (
          <MaterialIcons name="check-circle" size={20} color="#A5642A" />
        ) : (
          <View style={styles.optionCircle} />
        )}
      </TouchableOpacity>

      {/* Email Option */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedMethod === "Email" && styles.selectedOption,
        ]}
        onPress={() => setSelectedMethod("Email")}
      >
        <Text
          style={[
            styles.optionText,
            selectedMethod === "Email" && styles.selectedText,
          ]}
        >
          Email
        </Text>
        {selectedMethod === "Email" ? (
          <MaterialIcons name="check-circle" size={20} color="#A5642A" />
        ) : (
          <View style={styles.optionCircle} />
        )}
      </TouchableOpacity>

      {/* Next Button */}
      <View style={{ position: "relative", top: 70 }}>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* Cancel Text */}
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 199, // Fixed width
    height: 40, // Fixed height
    borderRadius: 20,
    backgroundColor: "#FFF8E5",
    marginBottom: 10,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: "#D8BD8A",
  },
  optionText: {
    fontSize: 16,
    color: "#6E6E6E",
    textAlign: "center", // Centers the text horizontally
    flex: 1, // Ensures the text occupies available space
  },
  selectedText: {
    fontWeight: "bold",
    color: "#000",
  },
  optionCircle: {
    width: 22,
    height: 22,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6E6E6E",
    backgroundColor: "transparent",
  },
  nextButton: {
    marginTop: 138,
    backgroundColor: "#A5642A",
    paddingVertical: 15,
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
    marginTop: 30,
    textAlign: "center",
    fontSize: 14,
    color: "#6E6E6E",
  },
});
