import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import { PaperProvider, Searchbar, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// services
import http from "../../services/httpService";

// Components
import FlashSaleScreen from "../flash-sale/ui/FlashSale";
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
import { SearchBar } from "react-native-screens";
import { SearchPayload, searchQueryAction } from "../search/slice/SearchSlice";
import { getFlashSaleListThunk } from "../flash-sale/slice/FlashSlice";

const MARGIN_HORIZONTAL = 14;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const sliderWidth = Dimensions.get("window").width - MARGIN_HORIZONTAL * 2;

  const [searchQuery, setSearchQuery] = React.useState("");

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
    dispach(getFlashSaleListThunk());

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
  }, [isFocused]);

  const handleImagePress = (id: string) => {
    // console.log(`Selected image ID: ${id}`);
  };

  const handleSelectCategory = (id: string) => {
    navigation.navigate("CategoryProducts", {
      categoryId: id,
      subcategoryId: null, // ✅ Pass null to avoid undefined
    });
  };

  const handleSeeAllCategories = () => {
    navigation.navigate("Category");
  };

  const handleSelectProduct = (label: string) => {
    // console.log(`Pressed: ${label}`);
  };

  const handleSeeAllNewItems = () => {
    navigation.navigate("AllProduct");
  };

  return (
    <>
      <PaperProvider>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: MARGIN_HORIZONTAL,
            marginVertical: 16,
            gap: 15,
          }}
        >
          <Text style={{ fontSize: 30, letterSpacing: 2, fontWeight: "bold" }}>
            Kaizen
          </Text>
          <Searchbar
            style={{
              flex: 1,
              backgroundColor: "#F8F8F8",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.102,
              shadowRadius: 10,
              elevation: 5,
            }}
            placeholder="Search"
            onChangeText={(searchQuery) => {
              setSearchQuery(searchQuery);
            }} // Updates the search query
            value={searchQuery} // Controls the value of the search bar
            returnKeyType="done"
            onSubmitEditing={() => {
              if (searchQuery !== "") {
                const search: SearchPayload = {
                  query: searchQuery,
                };
                dispach(searchQueryAction(search));
                navigation.navigate("SearchList", { query: search });
                Keyboard.dismiss();
                setSearchQuery("");
              }
            }}
          />
        </View>
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
