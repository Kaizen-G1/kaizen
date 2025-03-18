import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../RootNavigator";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
const ProfileScreenCustomer = () => {
  const [customerName, setCustomerName] = useState<string | null>(null);
  
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const fetchCustomerName = async () => {
      const name = await AsyncStorage.getItem("customerName");
      const userEmail = await AsyncStorage.getItem("userEmail");
      setCustomerName(name || "Hello, User!");
      setCustomerEmail(userEmail || "User Email");
    };
    fetchCustomerName();
  }, []);

  const handleLogout = async () => {
    // TODO: Implement method on logout event
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userEmail");
    await AsyncStorage.removeItem("userRole");
    await AsyncStorage.removeItem("customerName");
    await AsyncStorage.removeItem("vendorId");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.activityButton} onPress={handleLogout}>
          <Text style={styles.activityText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hello, {customerName}</Text>
      <Text style={styles.emailText}>{customerEmail}</Text>

      {/* Announcement Section */}
      <View style={styles.announcement}>
        <Text style={styles.announcementTitle}>Announcement</Text>
        <Text style={styles.announcementText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>

      {/* Recently Viewed Section */}
      <Text style={styles.sectionTitle}>Recently viewed</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recentlyViewed}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <Image
            key={item}
            source={{
              uri: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd",
            }}
            style={styles.recentImage}
          />
        ))}
      </ScrollView>

      {/* My Orders Section */}
      <Text style={styles.sectionTitle}>My Orders</Text>
      <View style={styles.orderButtons}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderText}>To Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButtonActive}>
          <Text style={styles.orderText}>To Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderText}>To Review</Text>
        </TouchableOpacity>
      </View>

      {/* New Arrivals Section */}
      <Text style={styles.sectionTitle}>New Arrivals</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.newArrivals}
      >
        {[1, 2, 3].map((item) => (
          <Image
            key={item}
            source={{
              uri: "https://images.unsplash.com/photo-1582509042139-71bbd7c519da",
            }}
            style={styles.newArrivalImage}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  activityButton: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activityText: { color: "#fff", fontWeight: "bold" },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  emailText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  announcement: {
    backgroundColor: "#e9ecef",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  announcementTitle: { fontWeight: "bold", fontSize: 16, color: "#555" },
  announcementText: { marginTop: 5, color: "#666" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 10,
  },
  recentlyViewed: { flexDirection: "row", marginBottom: 15 },
  recentImage: { width: 60, height: 60, borderRadius: 30, marginHorizontal: 5 },
  orderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  orderButton: {
    backgroundColor: "#753742",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  orderButtonActive: {
    backgroundColor: "#753742",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  orderText: { color: "#fff", fontWeight: "bold" },
  newArrivals: { flexDirection: "row" },
  newArrivalImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    elevation: 3,
  },
});

export default ProfileScreenCustomer;
