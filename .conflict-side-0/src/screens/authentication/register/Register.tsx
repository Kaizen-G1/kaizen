import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  TextInput,
  Button,
  IconButton,
  Text,
  PaperProvider,
} from "react-native-paper";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

import { useAppDispatch, useAppSelector } from "../../../services/constants";
import { registerUser } from "../slice/AuthSlice";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

type RegisterProps = {
  navigation: any;
};

function CreateAccountScreen({ navigation }: RegisterProps) {
  // Custom hooks
  const dispatch = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.auth.register
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Registration Failed", error, [{ text: "OK" }]);
    }
    if (success && response?.status === "success") {
      navigation.navigate("OTP", { email: formData.email });
    }
  }, [success, response, navigation, formData.email, error]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(registerUser(formData));
    console.log(formData);
  };

  const handleCancel = () => {
    navigation.navigate("Splash");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.photoContainer}>
          <IconButton
            icon="camera-outline"
            size={32}
            iconColor="#753742"
            onPress={() => {}}
          />
        </View>

        <TextInput
          style={[styles.input, styles.textInput]}
          label="Name"
          placeholder="Enter your name"
          mode="outlined"
          activeOutlineColor="#753742"
          outlineColor="transparent"
          selectionColor="#753742"
          placeholderTextColor="#BEBEBE"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
          outlineStyle={{ borderRadius: 59.29 }}
        />

        <TextInput
          style={[styles.input, styles.textInput]}
          label="Email"
          placeholder="Enter your email"
          mode="outlined"
          keyboardType="email-address"
          activeOutlineColor="#753742"
          outlineColor="transparent"
          selectionColor="#753742"
          placeholderTextColor="#BEBEBE"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          outlineStyle={{ borderRadius: 59.29 }}
        />

        <View style={styles.phoneContainer}>
          <TextInput
            style={[styles.phoneInput, styles.textInput]}
            label="Your number"
            placeholder="Enter your phone number"
            mode="outlined"
            keyboardType="numeric"
            activeOutlineColor="#753742"
            outlineColor="transparent"
            selectionColor="#753742"
            placeholderTextColor="#BEBEBE"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            theme={{ colors: { background: "#F8F8F8" } }}
            left={
              <TextInput.Icon
                icon={() => <Entypo name="old-phone" size={24} color="black" />}
              />
            }
            outlineStyle={{ borderRadius: 59.29 }}
          />
        </View>

        <View style={[styles.passwordContainer, { position: "relative" }]}>
          <TextInput
            style={[styles.input, styles.textInput]}
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            mode="outlined"
            activeOutlineColor="#753742"
            outlineColor="transparent"
            selectionColor="#753742"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            placeholderTextColor="#BEBEBE"
            outlineStyle={{ borderRadius: 59.29 }} // Rounded corners
          />
          <IconButton
            icon="eye-off-outline"
            size={20}
            style={{
              position: "absolute",
              right: 10,
              top: "30%",
              transform: [{ translateY: -10 }],
            }}
            onPress={() => {}}
          />
        </View>

        <CustomButton label="Done" onPress={handleSubmit} loading={loading} />
        <CustomButton label="Cancel" onPress={handleCancel} type="secondary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    position: "relative",

    // top: -20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    width: width - 78,
    lineHeight: 54,
    letterSpacing: -0.5,
    color: "#000000",
    marginTop: 40,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderWidth: 2.5,
    borderStyle: "dashed",
    borderColor: "#A55C2F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 27,
  },
  input: {
    height: 50,
    backgroundColor: "#F8F8F8",
    marginBottom: 7.9,
  },
  textInput: {
    color: "black", // Set the default text color to black
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 30,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7.9,
  },
  phoneInput: {
    flex: 1,
  },
  doneButton: {
    backgroundColor: "#A55C2F",
    height: 60,
    borderRadius: 15,
    marginBottom: 10,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 40, // Adjust this to match the button's height
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelText: {
    fontSize: 15,
    color: "#202020",
    fontWeight: "light",
    lineHeight: 26,
    textAlign: "center",
  },
  iconColor: {
    color: "#A55C2F", // Customize the color of the icon here
  },
});

export default CreateAccountScreen;
