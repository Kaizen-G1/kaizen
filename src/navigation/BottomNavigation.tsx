import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // Correct import
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/home/Home";

// Route components

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

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
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
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    favorites: FavoritesRoute,
    orders: OrdersRoute,
    cart: CartRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bottomNav}
      activeColor="#B76E79"
      inactiveColor="gray"
      renderIcon={({ route, focused }) => (
        <MaterialCommunityIcons
          name={focused ? route.focusedIcon : route.unfocusedIcon}
          size={24} // Adjust size as needed
          color={focused ? "#B76E79" : "gray"} // Active and inactive colors
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
  },
});

export default App;
