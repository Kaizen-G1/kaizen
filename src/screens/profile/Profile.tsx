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

import { fetchOrders } from "../vendors/home/slice/OrderSlice";
import { Badge, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import { getNotificationsThunk } from "../notifcations/slice/NotificatiosSlice";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
const ProfileScreenCustomer = () => {
  const [customerName, setCustomerName] = useState<string | null>(null);

  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const {
    orders = [],
    loading,
    error,
  } = useAppSelector((state) => state.orders || { orders: [] });

  console.log("Orders", orders);
  useEffect(() => {
    const fetchCustomerName = async () => {
      const name = await AsyncStorage.getItem("customerName");
      const userEmail = await AsyncStorage.getItem("userEmail");
      setCustomerName(name || "Hello, User!");
      setCustomerEmail(userEmail || "User Email");
    };
    fetchCustomerName();
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders for ToReceive and ToReview
  const toReceiveOrders = orders.filter(
    (order) =>
      order.status === "Awaiting Pickup" || order.status === "In transit"
  );
  const toReviewOrders = orders.filter((order) => order.status === "Complete");
  const toPayOrders = orders.filter((order) => order.status === "Pending");

  const handleNavigateToOrders = (type: string) => {
    if (type === "pay") {
      navigation.navigate("CustomerOrderList", { type, orders: toPayOrders });
      return;
    } else if (type === "receive") {
      navigation.navigate("CustomerOrderList", {
        type,
        orders: toReceiveOrders,
      });
      return;
    } else if (type === "review") {
      navigation.navigate("CustomerOrderList", {
        type,
        orders: toReviewOrders,
      });
      return;
    }
  };

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

  const { response } = useAppSelector(
    (state) => state.notifications.notifications
  );

  const notificationCount = response?.data?.count || 0;

  useEffect(() => {
    dispatch(getNotificationsThunk());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
            }}
            style={styles.profileImage}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              icon={() => (
                <Icon name="bell-outline" size={30} color="#753742" />
              )}
              onPress={() => {
                navigation.navigate("Notifications");
              }}
            />
            {notificationCount > 0 && (
              <Badge
                size={20}
                style={{
                  position: "absolute",
                  top: 0,
                  right: -2,
                  fontSize: 12,
                  fontWeight: "900",
                  color: "#fff",
                  backgroundColor: "#9B2C2D",
                }}
              >
                {notificationCount}
              </Badge>
            )}
          </View>
        </View>

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
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleNavigateToOrders("pay")}
        >
          <Text style={styles.orderText}>To Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderButtonActive}
          onPress={() => handleNavigateToOrders("receive")}
        >
          <Text style={styles.orderText}>To Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleNavigateToOrders("review")}
        >
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
