import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require("../../../assets/logo.png")} // Fetching the logo from the assets folder
            style={styles.logo}
          />
        </View>
      </View>
      <Text style={styles.title}>Kaizen</Text>
      <Text style={styles.subtitle}>Shop Smart, Live Better</Text>
      <View
        style={{
          marginTop: "auto",
          marginBottom: 50,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CustomButton
          label="Get Started"
          // paddingHorizontal={100}
          onPress={() => navigation.navigate("Register")}
        />
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.accountText}>I already have an account</Text>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    // justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 180,
  },
  logoCircle: {
    width: 120,
    height: 122,
    borderRadius: 72,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  logo: {
    width: 92,
    height: 81.4,
    resizeMode: "contain",
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 19,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  getStartedButton: {
    backgroundColor: "#BC6C25",
    width: 335,
    height: 61,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 186,
  },
  getStartedButtonText: {
    color: "#FFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  accountButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  accountText: {
    fontSize: 16,
    color: "#666",
    marginRight: 5,
  },
  arrowCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#BC6C25",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 12,
    color: "#FFF",
  },
});

export default SplashScreen;
