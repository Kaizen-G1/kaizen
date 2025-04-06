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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getProductThunk,
  ProductPayload,
} from "../vendors/product/slice/ProductSlice";
import { getReviewsByProductThunk } from "../../screens/productReview/slice/ProductReviewSlice";

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const { loading, error, success, response } = useAppSelector(
    (state) => state.wishlist.wishlist
  );

  const { reviewList } = useAppSelector((state) => state.review);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getReviewsByProductThunk(product.id || ""));
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
    <View style={{ flex: 1 }}>
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
        </View>

        {/* Rating & Reviews Section */}
        <Text style={styles.reviewHeader}>Rating & Reviews</Text>

        {reviewList.loading ? (
          <Text>Loading reviews...</Text>
        ) : reviewList.error ? (
          <Text>Error: {reviewList.error}</Text>
        ) : reviewList.success &&
          reviewList.response?.data &&
          reviewList.response.data.reviews.length > 0 ? (
          <View style={styles.reviewContainer}>
            <View style={styles.ratingSummary}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text
                    key={star}
                    style={star <= 4 ? styles.starFilled : styles.starUnfilled}
                  >
                    ★
                  </Text>
                ))}
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeText}>4/5</Text>
              </View>
            </View>

            {reviewList.response.data.reviews.slice(0, 2).map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/60x60.png?text=V",
                  }}
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>
                    {review.customer_name ?? "Anonymous"}
                  </Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Text
                        key={star}
                        style={
                          star <= review.rating
                            ? styles.starFilled
                            : styles.starUnfilled
                        }
                      >
                        ★
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.reviewText} numberOfLines={3}>
                    {review.comment}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() =>
                navigation.navigate("AllReviews", {
                  productId: product.id || "",
                })
              }
            >
              <Text style={styles.viewAllButtonText}>View All Reviews</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noReviewsText}>No reviews available</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  carouselContainer: {
    marginHorizontal: 5,
    marginVertical: 2,
    height: 300,
    backgroundColor: "#000",
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
    fontWeight: "600",
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
  deliveryOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#F9F9F9",
  },
  deliveryText: {
    fontSize: 16,
    color: "#444",
  },
  addToCartButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  ratingSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  starsRow: {
    flexDirection: "row",
  },
  starFilled: {
    color: "#FFA500",
    fontSize: 20,
  },
  starUnfilled: {
    color: "#DDD",
    fontSize: 20,
  },
  ratingBadge: {
    backgroundColor: "#5c2b29",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  noReviewsText: {
    fontSize: 20,
    color: "#000",
    textAlign: "justify",
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 10,
  },
  ratingBadgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewText: {
    color: "#444",
    marginTop: 5,
  },
  viewAllButton: {
    marginTop: 15,
    backgroundColor: "#D18236",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  viewAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductDetailsPage;
