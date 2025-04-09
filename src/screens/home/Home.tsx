import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  PaperProvider,
  Searchbar,
  Text,
} from "react-native-paper";

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
import { useAppDispatch, useAppSelector } from "../../services/constants";
import API_ROUTES from "../../api/apiRoutes";
import { SearchBar } from "react-native-screens";
import { SearchPayload, searchQueryAction } from "../search/slice/SearchSlice";
import { getFlashSaleListThunk } from "../flash-sale/slice/FlashSlice";
import { FlatList } from "react-native-gesture-handler";
import { getCustomerDashboardThunk } from "./slice/CustomerDashboardSlice";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";
import CustomIcon from "kaizen-components/components/CustomIcon/CustomIcon";
import ProductItem from "../../components/ProductItem";
import PagerView from "react-native-pager-view";
import BannerCarousel from "./ui/BannerCarousel";
import CategoryCard from "kaizen-components/components/CategoryCard/CategoryCard";
import CateogoryComponentProps from "./ui/CategoryComponent";

const MARGIN_HORIZONTAL = 14;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const sliderWidth = Dimensions.get("window").width - MARGIN_HORIZONTAL * 2;

  const width = Dimensions.get("screen").width;

  const [searchQuery, setSearchQuery] = React.useState("");

  const isFocused = useIsFocused();

  const dispach = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.dashboard.dashboard
  );

  useEffect(() => {
    if (isFocused) {
      dispach(getWishlistThunk());
    }

    dispach(getCustomerDashboardThunk());
    dispach(getFlashSaleListThunk());
  }, [dispach, isFocused]);

  const handleSelectCategory = (id: string) => {
    navigation.navigate("CategoryProducts", {
      categoryId: id,
      subcategoryId: null,
    });
  };

  const handleSeeAllCategories = () => {
    navigation.navigate("Category");
  };

  const handleSeeAllNewItems = () => {
    navigation.navigate("AllProduct");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#BC6C25" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!response) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No data available</Text>
      </View>
    );
  }

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
          <BannerCarousel
            data={response?.data?.dashboard.banners || []}
            handleImagePress={(id: string) => {}}
          />

          <CateogoryComponentProps
            data={response?.data?.dashboard.categories.slice(0, 6) || []}
            onSelectCategory={handleSelectCategory}
            onSeeAll={handleSeeAllCategories}
          />

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              paddingHorizontal: 20,
            }}
          >
            Top Products
          </Text>

          <FlatList
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={response?.data?.dashboard.topProducts.slice(0, 8) || []}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.id || "",
                    product: item,
                  });
                }}
              >
                <View style={styles.avatar}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{ uri: item.images[0] }}
                      style={{ width: 60, height: 60 }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          <HorizontalProductList
            products={response?.data?.dashboard.newItems || []}
            onPressSeeAll={handleSeeAllNewItems}
          />

          <FlashSaleScreen />

          {/* Just for You */}

          <Text
            style={{ fontSize: 24, fontWeight: "bold", paddingHorizontal: 20 }}
          >
            Just for You
          </Text>
          <FlatList
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}
            data={
              response?.data?.dashboard.allProducts.slice().toReversed() || []
            }
            renderItem={({ item }) => (
              <ProductItem
                productCardstyle={{ width: width / 2 - 20 }}
                imageStyle={{ height: 250 }}
                title={item.title}
                price={"$" + item.price.toString()}
                originalPrice={"$" + item.costPrice.toString()}
                image={
                  item.images.length > 0
                    ? item.images[0]
                    : "https://images.unsplash.com/photo-1628842456883-f8d529168be9"
                }
                isDiscounted={false}
                discount={"0"}
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    productId: item.id?.toString() ?? "",
                    product: item,
                  })
                }
              />
            )}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              columnGap: 10,
            }}
            scrollEnabled={false}
          />
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
  avatarContainer: {
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    marginRight: 10,
    elevation: 10,
  },

  seeAllText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
