// ProductItem.tsx
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { Text } from "react-native-paper";
import DiscountBadge from "./DiscountBadge";

interface ProductItemProps {
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  discount: string;
  isDiscounted?: boolean;
  onPress?: () => void;
  productCardstyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  price,
  originalPrice,
  image,
  discount,
  isDiscounted = true,
  productCardstyle,
  imageStyle,
  onPress,
}) => {
  return (
    <View style={[styles.productCard, productCardstyle]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: image }}
            style={[styles.productImage, imageStyle]}
          />
          {isDiscounted && <DiscountBadge discountPercentage={discount} />}
        </View>
        <Text style={styles.productTitle}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{price}</Text>
          {originalPrice !== price && (
            <Text style={styles.originalPrice}>{originalPrice}</Text>
          )}
        </View>
      </TouchableOpacity>
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
    color: "#000000",
  },
  originalPrice: {
    fontSize: 14,
    color: "#753742",
    textDecorationLine: "line-through",
  },
});

export default ProductItem;
