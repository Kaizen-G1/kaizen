import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import Counter from "./counter/Counter";

interface CartItemProps {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  initialQuantity?: number;
  isWish?: boolean;
  onWishPress?: () => void;
  onRemove?: () => void;
  onPress?: () => void;
  onQuantityChange?: (newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  title = "Lorem ipsum dolor sit amet consectetur.",
  description = "Pink, Size M",
  price = 17.0,
  imageUrl = "https://via.placeholder.com/100",
  initialQuantity = 1,
  isWish = false,
  onRemove,
  onPress,
  onQuantityChange,
  onWishPress,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity); // Sync state when `initialQuantity` changes
  }, [initialQuantity]);

  const handleQuantityChange = (newCount: number) => {
    setQuantity(newCount);
    onQuantityChange?.(newCount);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <IconButton
            icon="trash-can-outline"
            size={20}
            onPress={onRemove}
            style={styles.trashButton}
            iconColor="#753742"
            borderless
          />
        </View>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={{ flex: 1, paddingTop: 5 }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description || "No description..."}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${price}</Text>
          <Counter
            isWish={isWish}
            quantity={quantity} // Ensure it's properly passed
            onWishPress={onWishPress}
            onChangeQuantity={handleQuantityChange}
          />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: 129,
    height: 109,
    marginRight: 10,
    position: "relative",
    borderRadius: 9,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
    padding: 4,
    backgroundColor: "#FFFFFF",
    resizeMode: "cover",
  },
  trashButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "#fff",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    width: "75%",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    width: "75%",
    fontSize: 12,
    color: "#666",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
