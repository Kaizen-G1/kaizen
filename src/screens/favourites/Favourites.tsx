import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  getWishlistThunk,
  removeFromWishlistThunk,
} from "./slice/WishlistSlice";
import { ProductPayload } from "../vendors/product/slice/ProductSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AlertModal from "../../components/alert/AlertCustomModal";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";
import CartItem from "../../components/CartItem";
import {
  addToCartThunk,
  CartPayload,
  getCartThunk,
} from "../cart/slice/CartSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

type WishlistScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const WishlistScreen = () => {
  const navigation = useNavigation<WishlistScreenProp>();
  const dispach = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.wishlist.wishlist
  );

  const { dashboard } = useAppSelector((state) => state.dashboard);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispach(getWishlistThunk());
    }
  }, [dispach, isFocused]);

  const handleRemoveFromWishlist = async (product: ProductPayload) => {
    await dispach(removeFromWishlistThunk(product)).then(() => {
      dispach(getWishlistThunk());
    });
    // setShowSuccessModal(true);
  };

  const wishList = response?.data?.wishList || [];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C3EA6 " />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <AlertModal
        visible={showSuccessModal}
        title="Success"
        message="Product added to Cart"
        isLoading={loading}
        onClose={() => setShowSuccessModal(false)}
      />

      <Text style={styles.title}>Wishlist</Text>

      <Text style={styles.subtitle}>Recomended for you</Text>

      {dashboard.response?.data?.dashboard?.topProducts && (
        <View style={styles.recentlyViewedContainer}>
          <FlatList
            data={dashboard.response?.data?.dashboard?.allProducts
              .slice(0, 8)
              .toReversed()}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.id!,
                    product: item,
                  });
                }}
              >
                <Image
                  source={{ uri: item.images[2] }}
                  style={styles.recentImage}
                />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              navigation.navigate("AllProduct", {
                products:
                  dashboard.response?.data?.dashboard?.allProducts || [],
              });
            }}
          >
            <Ionicons name="arrow-forward" size={15} color="#6C3EA6" />
          </TouchableOpacity>
        </View>
      )}

      {wishList.length > 0 ? (
        <FlatList<ProductPayload>
          data={wishList}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
              <CartItem
                title={item.title}
                price={item.price}
                imageUrl={
                  item.images && item.images.length > 0 ? item.images[0] : ""
                }
                description={item.description || "No description available"}
                isWish={true}
                onRemove={() => handleRemoveFromWishlist(item)}
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.id!,
                    product: item,
                  });
                }}
              />
            </View>
          )}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in wishlist</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  recentlyViewedContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  recentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  arrowButton: {
    padding: 8,
    backgroundColor: "#EAEAEA",
    borderRadius: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default WishlistScreen;
