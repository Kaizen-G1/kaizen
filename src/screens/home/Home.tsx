import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Components
import FlashSaleScreen from "../../components/flash-sale/FlashSale";
import ImageSlider from "tenzai-components/components/ImageSlider/ImageSlider";
import CategoryList from "../../components/CategoryList";
import TopProducts from "../../components/TopProducts";
import HorizontalProductList from "../../components/HorizontalProducList";

const MARGIN_HORIZONTAL = 14;

const HomeScreen = () => {

  const sliderWidth = Dimensions.get('window').width - MARGIN_HORIZONTAL * 2;

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/dashboard");
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }
        const data = await response.json();

        // Getting active banners
        const activeBanners = data.banners
          .filter((banner: any) => banner.isActive)
          .map((banner: any) => ({
            id: banner.id,
            imageUrl: banner.imageUrl,
          }));
        setBanners(activeBanners);

        // Getting active categories
        const activeCategories = data.categories
          .filter((category: any) => category.isActive)
          .map((category: any) => ({
            id: category.id,
            title: category.name,
            count: category.count,
            images: category.demoImages,
          }));
        setCategories(activeCategories);

        // Getting top products
        const formattedTopProducts = data.topProducts.map((product: any) => ({
          id: product.id,
          title: product.title,
          soldCount: product.soldCount,
          price: product.price,
          image: product.images?.[0] || "",
        }));
        setTopProducts(formattedTopProducts);

        // Getting new items
        const formattedNewItems = data.newItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          createdDate: new Date(item.createdDate).toLocaleDateString(),
          price: item.price,
          image: item.images?.[0] || "",
        }));
        setNewItems(formattedNewItems);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
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
                items={topProducts}
                onPress={handleSelectProduct}
              />

              <HorizontalProductList
                products={newItems}
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
