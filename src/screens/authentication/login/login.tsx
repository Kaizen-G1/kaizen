import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      // TODO: Change IP to localhost later 
      const response = await fetch("http://10.6.88.29:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Connecting to Login API");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Alert.alert("Success", `Welcome ${data.customer.name}!`);
        console.log("Login successful:", data);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Something went wrong.");
        console.error("Login error:", errorData);
      }
    } catch (error) {
      console.error("Error during login request:", error);
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Good to see you back! <Text style={styles.heart}>❤</Text>
      </Text>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")} // Fetching the logo from the assets folder
          style={styles.logo}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#D2D2D2"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#D2D2D2"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => Alert.alert("Forgot Password?")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <CustomButton
        label="Login"
        onPress={handleLogin}
        paddingHorizontal={140}
      />

      <TouchableOpacity onPress={() => Alert.alert("Cancel pressed!")}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginLeft: Platform.OS === "ios" ? 20 : 0,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 19,
    color: "#666",
    marginBottom: 30,
    alignSelf: "flex-start",
    marginLeft: Platform.OS === "ios" ? 20 : 0,
  },
  heart: {
    color: "#000",
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 101,
    height: 123,
    resizeMode: "contain",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginRight: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#9FA2A5",
    fontWeight: "bold",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default LoginScreen;
