import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // Correct import
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/home/Home";
import Home from "../screens/vendors/home/Home";
import { Easing } from "react-native-reanimated";
import ProductListScreen from "../screens/vendors/product/Product";
import FlipCard from "../screens/vendors/wallet/Transaction";
import ProfileScreen from "../screens/vendors/profile/profile";

// Route components for customer
const FavoritesRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Favorites</Text>
  </SafeAreaView>
);

const OrdersRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Orders</Text>
  </SafeAreaView>
);

const CartRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Cart</Text>
  </SafeAreaView>
);

const ProfileRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Profile</Text>
  </SafeAreaView>
);

// Route components for vendor
const DashboardRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Dashboard</Text>
  </SafeAreaView>
);

const ProductsRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Products</Text>
  </SafeAreaView>
);

const OrdersVendorRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Orders</Text>
  </SafeAreaView>
);

const SettingsRoute = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerText}>Settings</Text>
  </SafeAreaView>
);

const CustomBottomNavigation = ({ isVendor = false }) => {
  const [index, setIndex] = useState(0);

  // Routes for customer
  const customerRoutes = [
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "favorites",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "orders",
      title: "Orders",
      focusedIcon: "clipboard-text",
      unfocusedIcon: "clipboard-text-outline",
    },
    {
      key: "cart",
      title: "Cart",
      focusedIcon: "cart",
      unfocusedIcon: "cart-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ];

  // Routes for vendor
  const vendorRoutes = [
    {
      key: "dashboard",
      title: "Orders",
      focusedIcon: "view-dashboard",
      unfocusedIcon: "view-dashboard-outline",
    },
    {
      key: "products",
      title: "Products",
      focusedIcon: "cube",
      unfocusedIcon: "cube-outline",
    },
    {
      key: "orders",
      title: "Wallet",
      focusedIcon: "clipboard-text",
      unfocusedIcon: "clipboard-text-outline",
    },

    {
      key: "settings",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ];

  const routes = isVendor ? vendorRoutes : customerRoutes;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    favorites: FavoritesRoute,
    orders: FlipCard,
    cart: CartRoute,
    profile: ProfileRoute,
    dashboard: Home,
    products: ProductListScreen,
    settings: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={[
        styles.bottomNav,
        {
          backgroundColor: "#fff",
          paddingHorizontal: isVendor ? 30 : 0,
        },
      ]}
      activeIndicatorStyle={{ backgroundColor: "transparent" }}
      compact={true}
      shifting={true}
      keyboardHidesNavigationBar={true}
      activeColor="#B76E79"
      sceneAnimationEnabled={true}
      sceneAnimationType="shifting"
      sceneAnimationEasing={Easing.inOut(Easing.quad)}
      labeled={true}
      renderIcon={({ route, focused }) => (
        <MaterialCommunityIcons
          name={focused ? route.focusedIcon : route.unfocusedIcon}
          size={24}
          color={focused ? "#B76E79" : "#000"}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bottomNav: {
    backgroundColor: "#fff",

    paddingVertical: 0,
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
});

export default CustomBottomNavigation;
