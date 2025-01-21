// src/screens/HomeScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Appbar, PaperProvider } from "react-native-paper";

// Components
import FlashSalePage from "../../components/flash/Flash";
import FlashSaleScreen from "../../components/flash-sale/FlashSale";
import CategoryList from "../../components/CategoryList";
import CircleList from "../../components//CircleList"

// Mock Data
import { CATEGORIES_LIST_MOCK } from "../../mock/categories-list.mock";
import { TOP_PRODUCTS_MOCK } from "../../mock/top-products.mock";

const HomeScreen = () => {

  const handleSelectCategory = (id: string) => {
    console.log(`Selected category ID: ${id}`);
  };

  const handleSeeAllCategories = () => {
    console.log(`See all categories`);
  };

  const handleSelectProduct = (label: string) => {
    console.log(`Pressed: ${label}`);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
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

        {/* <FlashSaleScreen /> */}

        <CategoryList
          title="Categories"
          categories={CATEGORIES_LIST_MOCK}
          onSelectCategory={handleSelectCategory}
          onSeeAll={handleSeeAllCategories}
        />

        <CircleList
          title='Top Products'
          items={TOP_PRODUCTS_MOCK}
          onPress={handleSelectProduct}
        />
      </ScrollView>
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
