// src/screens/HomeScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, Button, Appbar, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Components
import FlashSaleScreen from "../../components/flash-sale/FlashSale";
import ImageSlider from "tenzai-components/components/ImageSlider/ImageSlider";
import CategoryList from "../../components/CategoryList";
import TopProducts from "../../components/TopProducts";
import HorizontalProductList from "../../components/HorizontalProducList";

// Mock Data
import { BANNERS_MOCK } from "../../mock/banners.mock";
import { CATEGORIES_LIST_MOCK } from "../../mock/categories-list.mock";
import { TOP_PRODUCTS_MOCK } from "../../mock/top-products.mock";
import { NEW_ITEMS_LIST_MOCK } from "../../mock/new-items.mock";

const MARGIN_HORIZONTAL = 14;

const HomeScreen = () => {

  const sliderWidth = Dimensions.get('window').width - MARGIN_HORIZONTAL * 2;

  const handleImagePress = (id: string) => {
    console.log(`Selected image ID: ${id}`);
  };

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
      <SafeAreaProvider>
        <PaperProvider>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView>
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
              <View style={styles.sliderContainer}>
                <ImageSlider
                  data={BANNERS_MOCK}
                  handleImagePress={handleImagePress}
                  sliderWidth={sliderWidth}
                />
              </View>
              
              <CategoryList
                title="Categories"
                categories={CATEGORIES_LIST_MOCK}
                onSelectCategory={handleSelectCategory}
                onSeeAll={handleSeeAllCategories}
              />

              <TopProducts
                title='Top Products'
                items={TOP_PRODUCTS_MOCK}
                onPress={handleSelectProduct}
              />

              <HorizontalProductList
                products={NEW_ITEMS_LIST_MOCK}
                onPressSeeAll={handleSeeAllCategories}
              />
            </ScrollView>
          </SafeAreaView>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 25,
  },
  appbar: {
    height: 48,
    backgroundColor: "red",
  },
  sliderContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: 15,
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
