import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { TextInput, Button, IconButton } from "react-native-paper"; // Import Paper components
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

const { width } = Dimensions.get("screen");
const CreateAccountScreen: React.FC = () => {
  return (
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
        label="Email"
        placeholder="Enter your email"
        mode="outlined"
        activeOutlineColor="#753742"
        outlineColor="transparent"
        selectionColor="#753742"
        placeholderTextColor="#BEBEBE"
        outlineStyle={{ borderRadius: 59.29 }} // Add this line to round the outline
      />

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
          placeholderTextColor="#BEBEBE"
          outlineStyle={{ borderRadius: 59.29 }} // Rounded corners
        />
        <IconButton
          icon="eye-off-outline"
          size={20}
          style={{
            position: "absolute",
            right: 10, // Adjust the position relative to the right edge
            top: "30%", // Position in the middle vertically
            transform: [{ translateY: -10 }], // Center adjustment for the icon size
          }}
          onPress={() => {}}
        />
      </View>

      <View style={styles.phoneContainer}>
        <TextInput
          style={[styles.phoneInput, styles.textInput]}
          label="Your number"
          placeholder="Enter your phone number"
          mode="outlined"
          activeOutlineColor="#753742"
          outlineColor="transparent"
          selectionColor="#753742"
          placeholderTextColor="#BEBEBE"
          theme={{ colors: { background: "#F8F8F8" } }}
          left={
            <TextInput.Icon
              icon={() => <Entypo name="old-phone" size={24} color="black" />}
            />
          }
          outlineStyle={{ borderRadius: 59.29 }} // Add this line to round the outline
        />
      </View>

      {/* <Button
        mode="contained"
        style={styles.doneButton}
        labelStyle={styles.doneButtonText}
        onPress={() => {}}
      >
        Done
      </Button>
       */}
      <CustomButton label="Done" onPress={() => {}} />

      <Button
        mode="text"
        style={styles.cancelButton}
        labelStyle={styles.cancelText}
        onPress={() => {}}
      >
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 0,
    position: "relative",
    top: -20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    width: width - 78,
    lineHeight: 54,
    letterSpacing: -0.5,
    color: "#000000",
    marginBottom: 30,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderWidth: 2.5,
    borderStyle: "dashed",
    borderColor: "#A55C2F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    borderRadius: 50,
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
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 52.1,
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
