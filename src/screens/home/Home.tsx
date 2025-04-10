import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  ActivityIndicator,
  PaperProvider,
  Searchbar,
  Text,
} from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";
import { getWishlistThunk } from "../favourites/slice/WishlistSlice";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import { searchQueryAction, SearchPayload } from "../search/slice/SearchSlice";
import { getFlashSaleListThunk } from "../flash-sale/slice/FlashSlice";
import { getCustomerDashboardThunk } from "./slice/CustomerDashboardSlice";

// Components
import BannerCarousel from "./ui/BannerCarousel";
import CateogoryComponentProps from "./ui/CategoryComponent";
import HorizontalProductList from "../../components/HorizontalProducList";
import FlashSaleScreen from "../flash-sale/ui/FlashSale";
import ProductItem from "../../components/ProductItem";

const MARGIN_HORIZONTAL = 14;
const SCREEN_WIDTH = Dimensions.get("window").width;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.dashboard.dashboard
  );

  const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 4;

  useEffect(() => {
    if (isFocused) {
      dispatch(getWishlistThunk());
    }
    dispatch(getCustomerDashboardThunk());
    dispatch(getFlashSaleListThunk());
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (response?.data?.dashboard.allProducts) {
      const sliced = response.data.dashboard.allProducts.slice(
        0,
        PAGE_SIZE * page
      );
      setVisibleProducts(sliced);
    }
  }, [response, page]);

  const handleLoadMore = () => {
    if (
      visibleProducts.length <
      (response?.data?.dashboard.allProducts?.length ?? 0)
    ) {
      setPage((prev) => prev + 1);
    }
  };

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

  const renderHeader = () => (
    <View>
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
          onChangeText={setSearchQuery}
          value={searchQuery}
          returnKeyType="done"
          onSubmitEditing={() => {
            if (searchQuery !== "") {
              const search: SearchPayload = { query: searchQuery };
              dispatch(searchQueryAction(search));
              navigation.navigate("SearchList", { query: search });
              Keyboard.dismiss();
              setSearchQuery("");
            }
          }}
        />
      </View>

      <BannerCarousel
        data={response?.data?.dashboard.banners || []}
        handleImagePress={() => {}}
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
        style={{ paddingVertical: 16, paddingHorizontal: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={response?.data?.dashboard.topProducts.slice(0, 8) || []}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetails", {
                productId: item.id?.toString() || "",
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

      <Text style={{ fontSize: 24, fontWeight: "bold", paddingHorizontal: 20 }}>
        Just for You
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#BC6C25" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={visibleProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            productCardstyle={{ width: SCREEN_WIDTH / 2 - 24 }}
            imageStyle={{ height: 250 }}
            title={item.title}
            price={`$${item.price}`}
            originalPrice={`$${item.costPrice}`}
            image={
              item.images[0] ??
              "https://images.unsplash.com/photo-1628842456883-f8d529168be9"
            }
            isDiscounted={false}
            discount="0"
            onPress={() =>
              navigation.navigate("ProductDetails", {
                productId: item.id,
                product: item,
              })
            }
          />
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          const allLoaded =
            visibleProducts.length >=
            (response?.data?.dashboard.allProducts.length ?? 0);
          return (
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              {allLoaded ? (
                <Text style={{ color: "#999" }}>No more products</Text>
              ) : (
                <ActivityIndicator size="small" color="#BC6C25" />
              )}
            </View>
          );
        }}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default HomeScreen;
