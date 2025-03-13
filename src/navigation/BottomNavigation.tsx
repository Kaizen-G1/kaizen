import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Easing } from "react-native-reanimated";

// Import Screens
import HomeScreen from "../screens/home/Home"; // Customer Home
import Home from "../screens/vendors/home/ui/OrderListScreen"; // Vendor Dashboard
import ProductListScreen from "../screens/vendors/product/Product";
import FlipCard from "../screens/vendors/wallet/Transaction";
import ProfileScreen from "../screens/vendors/profile/profile";
import ProfileScreenCustomer from "../screens/profile/Profile";
import CartScreen from "../screens/cart/Cart";
import FavouriteScreen from "../screens/favourites/Favourites";

// Placeholder screens for customers

const CustomBottomNavigation = ({ isVendor = false }) => {
  const [index, setIndex] = useState(0);

  // Define routes dynamically
  const routes = isVendor
    ? [
        {
          key: "dashboard",
          title: "Dashboard",
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
          key: "wallet",
          title: "Wallet",
          focusedIcon: "wallet",
          unfocusedIcon: "wallet-outline",
        },
        {
          key: "settings",
          title: "Profile",
          focusedIcon: "account",
          unfocusedIcon: "account-outline",
        },
      ]
    : [
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

  // Function-based scene rendering for better performance
  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "home":
        return <HomeScreen />;
      case "favorites":
        return <FavouriteScreen />;
      case "cart":
        return <CartScreen />;
      case "profile":
        return <ProfileScreenCustomer />;
      case "dashboard":
        return <Home />;
      case "products":
        return <ProductListScreen />;
      case "wallet":
        return <FlipCard />;
      case "settings":
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  const renderIcon = ({
    route,
    focused,
  }: {
    route: { focusedIcon: string; unfocusedIcon: string };
    focused: boolean;
  }) => (
    <MaterialCommunityIcons
      name={focused ? route.focusedIcon : route.unfocusedIcon}
      size={24}
      color={focused ? "#B76E79" : "#000"}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        barStyle={[
          styles.bottomNav,
          { backgroundColor: "#fff", paddingHorizontal: isVendor ? 20 : 0 }, // Adjusted padding
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
      />
    </SafeAreaView>
  );
};

// Styles
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
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    elevation: 3,
    borderTopWidth: 1, // Set the width of the top border
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default CustomBottomNavigation;
