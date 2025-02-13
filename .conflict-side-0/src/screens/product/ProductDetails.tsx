import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  addToWishlistThunk,
  getWishlistThunk,
  removeFromWishlistThunk,
} from "../favourites/slice/WishlistSlice";
import AlertModal from "../../components/alert/AlertCustomModal";

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getProductThunk,
  ProductPayload,
} from "../vendors/product/slice/ProductSlice";
import { get, set } from "mongoose";
import { addToCartThunk, CartPayload } from "../cart/slice/CartSlice";

const { width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "ProductDetails">;

const defaultImages = [
  "https://via.placeholder.com/400x300.png?text=Image+1",
  "https://via.placeholder.com/400x300.png?text=Image+2",
  "https://via.placeholder.com/400x300.png?text=Image+3",
];

const ProductDetailsPage: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  const dispatch = useAppDispatch();
  const { loading, error, success, response } = useAppSelector(
    (state) => state.wishlist.wishlist
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getWishlistThunk());
    }
  }, [dispatch, isFocused]);

  const products: ProductPayload[] = response?.data.wishList || [];

  const existingProduct = products.find((item) => item.id === product.id);

  const imageUrls =
    product?.images && product.images.length > 0
      ? product.images
      : defaultImages;

  const [activeIndex, setActiveIndex] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setIsFavorite(true);
    }
  }, [existingProduct, isFavorite]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.floor(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);

    setShowSuccessModal(true);
  };

  const handleAddToCart = async () => {
    const customerId = await AsyncStorage.getItem("vendorId");
    const cart: CartPayload = {
      customerId: customerId || "",
      productId: product.id || "",
      quantity: 1,
      status: "pending",
      product: product,
    };
    dispatch(addToCartThunk(cart));
  };

  if (error) {
    setShowSuccessModal(true);
    return (
      <AlertModal
        title={"Error"}
        visible={showSuccessModal}
        message="Something went wrong"
        btnlabel="Try again"
        onPress={() => getWishlistThunk()}
        onClose={() => setShowSuccessModal(false)}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <AlertModal
        title={loading ? "Loading" : "Success"}
        isLoading={loading}
        visible={showSuccessModal}
        message={response?.data.message}
        onClose={() => setShowSuccessModal(false)}
      />
      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {imageUrls.map((uri, index) => (
            <Image
              key={uri}
              source={{ uri }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <View style={styles.indicators}>
          {imageUrls.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.indicator,
                activeIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.sectionTitle}>{product.title}</Text>
          <IconButton
            icon={isFavorite ? "heart" : "heart-outline"}
            iconColor={isFavorite ? "#BC6C25" : "gray"}
            size={30}
            onPress={() => {
              if (isFavorite) {
                dispatch(removeFromWishlistThunk(product));
              } else {
                dispatch(addToWishlistThunk(product));
              }
              toggleFavorite();
            }}
          />
        </View>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>
          {product.description ?? "Desciption not available"}
        </Text>

        {/* Delivery Options */}
        <Text style={styles.sectionTitle}>Delivery</Text>
        <View style={styles.deliveryOption}>
          <Text style={styles.deliveryText}>Standard</Text>
          <Text style={styles.deliveryText}>5-7 days</Text>
          <Text style={styles.deliveryText}>$3.00</Text>
        </View>
        <View style={styles.deliveryOption}>
          <Text style={styles.deliveryText}>Express</Text>
          <Text style={styles.deliveryText}>1-2 days</Text>
          <Text style={styles.deliveryText}>$12.00</Text>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    height: 300,
    backgroundColor: "#000", // To contrast with the images
  },
  image: {
    width: width,
    height: 300,
  },
  indicators: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#BC6C25",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    padding: 20,
  },
  price: {
    fontSize: 26,
    fontWeight: "semibold",
    color: "#333",
  },
  description: {
    color: "#666",
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
  },

  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#BC6C25",
    borderColor: "#BC6C25",
  },
  optionText: {
    color: "#333",
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
  },
  specText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  deliveryOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
  },
  deliveryText: {
    fontSize: 16,
    color: "#444",
  },
  addToCartButton: {
    backgroundColor: "#BC6C25",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsPage;
