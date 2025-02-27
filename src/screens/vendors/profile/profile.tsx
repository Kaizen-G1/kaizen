import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Avatar, Text } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../RootNavigator";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    // TODO: Implement method on logout event
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userRole");
    await AsyncStorage.removeItem("userEmail");
    await AsyncStorage.removeItem("vendorId");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/a6/ec/23/a6ec23ef9dcd2c6e9c15a7d9acbd443a.jpg",
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Business Name</Text>
          <Text style={styles.profileLocation}>Business Location</Text>
        </View>
      </View>

      <Text style={styles.setupText}>Let's set up your business</Text>
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="file-text" size={20} color="black" />
        <Text style={styles.menuText}>Business Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="settings" size={20} color="black" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="black" />
        <Text style={styles.menuText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#E0E0E0",
  },

  profileName: { fontSize: 18, fontWeight: "bold" },
  profileLocation: { fontSize: 14, color: "gray" },
  setupText: { fontSize: 16, color: "gray", marginBottom: 25 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 20 },
  menuText: { fontSize: 16, marginLeft: 15 },
});

export default ProfileScreen;
