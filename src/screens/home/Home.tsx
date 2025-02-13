import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// services
import http from "../../services/httpService";

// Components
import FlashSaleScreen from "../../components/flash-sale/FlashSale";
import ImageSlider from "kaizen-components/components/ImageSlider/ImageSlider";
import CategoryList from "../../components/CategoryList";
import TopProducts from "../../components/TopProducts";
import HorizontalProductList from "../../components/HorizontalProducList";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";
import { useIsFocused } from "@react-navigation/native";
import { getWishlistThunk } from "../favourites/slice/WishlistSlice";
import { useAppDispatch } from "../../services/constants";
import API_ROUTES from "../../api/apiRoutes";

const MARGIN_HORIZONTAL = 14;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const sliderWidth = Dimensions.get("window").width - MARGIN_HORIZONTAL * 2;

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);

  const isFocused = useIsFocused();

  const dispach = useAppDispatch();

  useEffect(() => {
    if (isFocused) {
      dispach(getWishlistThunk());
    }

    const fetchDashboardData = async () => {
      try {
        const { data } = await http.get(API_ROUTES.dashboard.get);

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
        const formattedTopProducts = data.topProducts.map(
          (topProduct: any) => ({
            id: topProduct.id,
            image: topProduct.images[0],
          })
        );
        setTopProducts(formattedTopProducts);

        // Getting new items
        const formattedNewItems = data.newItems.map((newProduct: any) => ({
          id: newProduct.id,
          image: newProduct.images[0],
          title: newProduct.title,
          price: newProduct.price,
        }));
        setNewItems(formattedNewItems);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleImagePress = (id: string) => {
    console.log(`Selected image ID: ${id}`);
  };

  const handleSelectCategory = (id: string) => {
    console.log(`Selected category ID: ${id}`);
    navigation.navigate("CategoryProducts", { categoryId: id });
  };

  const handleSeeAllCategories = () => {
    console.log(`See all categories`);    
    navigation.navigate("Category");
  };

  const handleSelectProduct = (label: string) => {
    console.log(`Pressed: ${label}`);
  };

  const handleSeeAllNewItems = () => {
    console.log(`See all new items`);
    navigation.navigate("AllProduct");
  };

  return (
    <>
      <PaperProvider>
        <ScrollView>
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
            title="Top Products"
            items={topProducts}
            onPress={handleSelectProduct}
          />

          <HorizontalProductList
            products={newItems}
            onPressSeeAll={handleSeeAllNewItems}
          />

          <FlashSaleScreen />
        </ScrollView>
      </PaperProvider>
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
