import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

type LoginScreenProps = {
  navigation: any;
};
const LoginScreen = ({ navigation }: LoginScreenProps) => {
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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#D2D2D2"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => alert("Forgot Password?")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <CustomButton label="Login" onPress={() => navigation.navigate("Home")} />

      {/* <TouchableOpacity
        style={styles.loginButton}
        onPress={() => alert("Login pressed!")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => navigation.navigate("Splash")}>
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
    // marginLeft: 5
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
  loginButton: {
    backgroundColor: "#BC6C25",
    width: "90%",
    height: 61,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "medium",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default LoginScreen;
