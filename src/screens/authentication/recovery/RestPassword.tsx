import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // For password match validation

  const handleNewPasswordChange = (value: React.SetStateAction<string>) =>
    setNewPassword(value);
  const handleRepeatPasswordChange = (value: React.SetStateAction<string>) => {
    setRepeatPassword(value);
    if (newPassword !== value) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSubmit = () => {
    if (newPassword === repeatPassword) {
      // console.log("Password updated");
      // Proceed with password update logic
    } else {
      // console.log("Passwords do not match");
    }
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
      <Text style={styles.title}>Create a New Password</Text>
      <Text style={styles.subtitle}>
        Please set a new password for your account.
      </Text>

      {/* New Password */}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={handleNewPasswordChange}
      />

      {/* Repeat Password */}
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        secureTextEntry
        value={repeatPassword}
        onChangeText={handleRepeatPasswordChange}
      />

      {/* Password Match Error */}
      {!passwordMatch && (
        <Text style={styles.errorText}>Passwords do not match</Text>
      )}

      {/* Submit Button */}
      {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
      <View style={{ paddingTop: 50 }}>
        <CustomButton label="Submit" onPress={handleSubmit} />
      </View>
      {/* Cancel Button */}
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
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#6E6E6E",
    paddingBottom: 20,
  },
  input: {
    borderColor: "#6E6E6E",
    borderWidth: 1,
    borderRadius: 10,
    width: 335,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 138,
    backgroundColor: "#A5642A",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 335,
    height: 60,
  },

  submitButtonText: {
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
