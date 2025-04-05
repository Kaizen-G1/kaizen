import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";
import { logger } from "react-native-logs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "../../../utils/enums";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import API_ROUTES from "../../../api/apiRoutes";
import { useAppDispatch, useAppSelector } from "../../../services/constants";
import { setUserDetails, UserDetails } from "../slice/AuthSlice";

const log = logger.createLogger();

type LoginScreenProps = {
  navigation: any;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const { userDetails } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      const response = await fetch(API_ROUTES.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const accessToken = data.data?.accessToken;
        const refreshToken = data.data?.refreshToken;

        if (!accessToken || typeof accessToken !== "string") {
          log.error("Invalid accessToken:", accessToken);
          Alert.alert("Error", "Invalid token received from the server.");
          return;
        }

        // Decodificar el JWT
        const decodedToken: any = jwtDecode(accessToken);
        log.debug("Decoded JWT:", decodedToken);

        // Guardar tokens en AsyncStorage
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken || "");
        await AsyncStorage.setItem("userRole", decodedToken.role || "");
        await AsyncStorage.setItem("userEmail", decodedToken.email || "");
        await AsyncStorage.setItem("customerName", decodedToken.name || "");

        await AsyncStorage.setItem("vendorId", decodedToken.id || "");

        const userDetials: UserDetails = {
          userId: decodedToken.id,
          userRole: decodedToken.role,
          userName: decodedToken.name,
          userEmail: decodedToken.email,
        };
        dispatch(setUserDetails(userDetials));

        const isVendor = decodedToken.role === UserRole.COMPANY;
        navigation.reset({
          index: 0,
          routes: [{ name: "Home", params: { isVendor } }],
        });
      } else {
        log.error("Login failed:", data);
        Alert.alert("Error", data.error || "Something went wrong.");
      }
    } catch (error) {
      log.error("Error during login request:", error);
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { paddingTop: Platform.OS === "ios" ? 120 : 20 },
        ]}
      >
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
          // paddingHorizontal={140}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Splash");
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 50,
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
