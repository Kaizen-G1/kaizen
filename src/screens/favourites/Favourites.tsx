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
import AddIcon from "../../components/AddIcon";
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

const recentlyViewed = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
  },
];

const wishlistItems = [
  {
    id: "1",
    image: "https://via.placeholder.com/80",
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    oldPrice: null,
    color: "Pink",
    size: "M",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/80",
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$12,00",
    oldPrice: "$17,00",
    color: "Pink",
    size: "M",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/80",
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$27,00",
    oldPrice: null,
    color: "Pink",
    size: "M",
  },
  {
    id: "4",
    image: "https://via.placeholder.com/80",
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$19,00",
    oldPrice: null,
    color: "Pink",
    size: "M",
  },
];

type WishlistScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const WishlistScreen = () => {
  const navigation = useNavigation<WishlistScreenProp>();
  const dispach = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.wishlist.wishlist
  );

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

      <View style={styles.recentlyViewedContainer}>
        <FlatList
          data={recentlyViewed}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.image }} style={styles.recentImage} />
          )}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.arrowButton}>
          <Ionicons name="arrow-forward" size={15} color="#6C3EA6" />
        </TouchableOpacity>
      </View>

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
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.id!,
                    product: item,
                  });
                }}
                onWishPress={async () => {
                  const customerId = await AsyncStorage.getItem("vendorId");
                  const cart: CartPayload = {
                    id: "",
                    customerId: customerId || "",
                    productId: item.id!,
                    quantity: 1,
                    status: "active",
                    product: item,
                  };
                  dispach(addToCartThunk(cart));
                  dispach(getCartThunk());
                  setShowSuccessModal(true);
                }}
                onRemove={() => handleRemoveFromWishlist(item)}
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
