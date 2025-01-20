// src/screens/HomeScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";
import FlashSaleScreen from "../../components/flash-sale/FlashSale";
import FlashSalePage from "../../components/flash/Flash";

const HomeScreen = () => {
  return (
    <>
      {/* <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Home" />
        </Appbar.Header>
        <View style={styles.content}>
          <Text style={styles.text}>Welcome to the E-Shop!</Text>
          <Button mode="contained" onPress={() => console.log("Go to Shop")}>
            Go to Shop
          </Button>
        </View>
      </View> */}
      <FlashSalePage />
      <FlashSaleScreen />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
