import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { Text } from "react-native-paper";
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

interface Product {
  id: string;
  image: string;
  price: number;
  discountPrice?: number;
  color: string;
  size: string;
  description: string;
}

interface RecentlyViewedItem {
  id: string;
  image: string;
}

const recentlyViewedData: RecentlyViewedItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1542067420-a303f57c7956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1592755704856-26c9d9ac205f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1571867424486-7f2d27c2e4f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
];

type WishlistScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const WishlistScreen: React.FC = () => {
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
    await dispach(removeFromWishlistThunk(product));
    setShowSuccessModal(true);
    dispach(getWishlistThunk());
  };

  return (
    <View style={styles.container}>
      <AlertModal
        title="Success"
        isLoading={loading}
        isError={!success}
        visible={showSuccessModal}
        message="Product removed from wishlist"
        onClose={() => setShowSuccessModal(false)}
      />
      <Text style={styles.headerTitle}>Wishlist</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {/* Recently Viewed */}
        <Text style={styles.sectionTitle}>Most Popular</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentlyViewedScroll}
        >
          {recentlyViewedData.map((item) => (
            <View key={item.id} style={styles.avatarWrapper}>
              <Image source={{ uri: item.image }} style={styles.avatarImage} />
            </View>
          ))}
        </ScrollView>

        {/* Wishlist Items */}
        {response?.data && response?.data.wishList.length > 0 ? (
          response?.data.wishList.map((item, index) => {
            const hasDiscount = item.discount !== undefined;

            return (
              <TouchableOpacity
                onPress={() => {
                  if (item.id) {
                    navigation.navigate("ProductDetails", {
                      productId: item.id,
                      product: item,
                    });
                  }
                }}
              >
                <View
                  key={item.id ? item.id.toString() : index.toString()}
                  style={styles.itemCard}
                >
                  <View style={styles.itemInfo}>
                    {/* Price Row */}
                    <View style={styles.priceRow}>
                      {hasDiscount ? (
                        <>
                          <Text style={styles.oldPrice}>${item.costPrice}</Text>
                          <Text style={styles.newPrice}>
                            ${item.discount?.toString()}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.newPrice}>${item.price}</Text>
                      )}
                    </View>

                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.metaText}>
                      {item.inStock} | {item.unit}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleRemoveFromWishlist(item)}
                  >
                    <Ionicons name={"heart"} size={22} color={"red"} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.headerTitle}>No items in wishlist</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcon: {
    padding: 4,
  },

  /* Section Title */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  /* Recently Viewed */
  recentlyViewedScroll: {
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /* Wishlist Items */
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 10,
    resizeMode: "cover",
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
  },
  iconButton: {
    marginLeft: 10,
    padding: 4,
  },
});
