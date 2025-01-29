// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
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
import { TOP_PRODUCTS_MOCK } from "../../mock/top-products.mock";
import { NEW_ITEMS_LIST_MOCK } from "../../mock/new-items.mock";

const MARGIN_HORIZONTAL = 14;

const HomeScreen = () => {

  const sliderWidth = Dimensions.get('window').width - MARGIN_HORIZONTAL * 2;

  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:3000/banners");
        if (!response.ok) {
          throw new Error(`Failed to fetch banners: ${response.status}`);
        }
        const data = await response.json();
        const activeBanners = data
          .filter((banner: any) => banner.isActive)
          .map((banner: any) => ({
            id: banner.id,
            imageUrl: banner.imageUrl,
          }));
        setBanners(activeBanners);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBanners();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        const data = await response.json();
        const activeCategories = data
          .filter((category: any) => category.isActive)
          .map((category: any) => ({
            id: category.id,
            title: category.name,
            count: category.count,
            images: category.demoImages
          }));
        setCategories(activeCategories);

        console.log("activeCategories");
        console.log(activeCategories);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleSeeAllNewItems = () => {
    console.log(`See all new items`);
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
                  data={banners}
                  handleImagePress={handleImagePress}
                  sliderWidth={sliderWidth}
                />
              </View>
              
              <CategoryList
                title="Categories"
                categories={categories}
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
                onPressSeeAll={handleSeeAllNewItems}
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
