import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// Ionicons (or you can use any other icon library from @expo/vector-icons)
import { Ionicons } from "@expo/vector-icons";

interface RecentlyViewedItem {
  id: string;
  image: string;
}

interface WishlistItem {
  id: string;
  image: string;
  description: string;
  price: string;
  discountedPrice?: string;
  color: string;
  size: string;
}

// Dummy data for "Recently viewed" horizontal scroll
const recentlyViewedData: RecentlyViewedItem[] = [
  {
    id: "1",
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    image:
      "https://images.pexels.com/photos/6311628/pexels-photo-6311628.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    image:
      "https://images.pexels.com/photos/6311627/pexels-photo-6311627.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    image:
      "https://images.pexels.com/photos/6311628/pexels-photo-6311628.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "5",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// Dummy data for the Wishlist items
const wishlistData: WishlistItem[] = [
  {
    id: "1",
    image:
      "https://images.pexels.com/photos/6311626/pexels-photo-6311626.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17.00",
    color: "Pink",
    size: "M",
  },
  {
    id: "2",
    image:
      "https://images.pexels.com/photos/6311630/pexels-photo-6311630.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17.00",
    discountedPrice: "$12.00",
    color: "Pink",
    size: "M",
  },
  {
    id: "3",
    image:
      "https://images.pexels.com/photos/6311627/pexels-photo-6311627.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$27.00",
    color: "Pink",
    size: "M",
  },
  {
    id: "4",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$19.00",
    color: "Pink",
    size: "M",
  },
];

const WishlistPage: React.FC = () => {
  const handleRemoveItem = (id: string) => {
    // Here you can handle the removal of the item from the wishlist.
    console.log("Remove item with ID:", id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Titles */}
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>Recently viewed</Text>

      {/* Recently Viewed Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recentlyViewedScroll}
      >
        {recentlyViewedData.map((item) => (
          <View key={item.id} style={styles.recentlyViewedCircle}>
            <Image
              source={{ uri: item.image }}
              style={styles.recentlyViewedImage}
            />
          </View>
        ))}
      </ScrollView>

      {/* Wishlist Items */}
      {wishlistData.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Product Image */}
          <Image source={{ uri: item.image }} style={styles.cardImage} />

          {/* Middle Info Section */}
          <View style={styles.cardInfo}>
            <Text style={styles.cardDescription}>{item.description}</Text>

            {/* Price Row (with discount if applicable) */}
            <View style={styles.priceRow}>
              {item.discountedPrice ? (
                <>
                  <Text style={styles.originalPrice}>{item.price}</Text>
                  <Text style={styles.discountedPrice}>
                    {item.discountedPrice}
                  </Text>
                </>
              ) : (
                <Text style={styles.price}>{item.price}</Text>
              )}
            </View>

            {/* Color and Size */}
            <View style={styles.tagRow}>
              <Text style={styles.tag}>{item.color}</Text>
              <Text style={styles.tag}>{item.size}</Text>
            </View>
          </View>

          {/* Trash Icon Button */}
          <TouchableOpacity
            style={styles.trashButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Ionicons name="trash" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default WishlistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  recentlyViewedScroll: {
    marginBottom: 16,
  },
  recentlyViewedCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 8,
  },
  recentlyViewedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: "cover",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "space-around",
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#999",
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 14,
    color: "#E91E63",
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
  tagRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    fontSize: 12,
    color: "#333",
  },
  trashButton: {
    padding: 6,
    marginLeft: 8,
  },
});
