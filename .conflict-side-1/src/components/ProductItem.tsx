// ProductItem.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import DiscountBadge from "./DiscountBadge";

interface ProductItemProps {
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  discount: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  price,
  originalPrice,
  image,
  discount,
}) => {
  return (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <DiscountBadge discountPercentage={discount} />
      <Text style={styles.productTitle}>{title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>{price}</Text>
        {originalPrice && (
          <Text style={styles.originalPrice}>{originalPrice}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    width: "48%",
  },
  productImageContainer: {
    borderRadius: 9,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    height: 171,
    margin: 5,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
  },
  productTitle: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333",
    overflow: "hidden",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    paddingVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7A4B94",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
});

export default ProductItem;
