import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ProductDetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState("Pink");
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("./assets/product-image.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.indicators}>
        <View style={[styles.indicator, styles.activeIndicator]}></View>
        <View style={styles.indicator}></View>
        <View style={styles.indicator}></View>
      </View>
      <View style={styles.content}>
        <Text style={styles.price}>$17.00</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text style={styles.sectionTitle}>Variations</Text>
        <View style={styles.variationContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedColor === "Pink" && styles.selectedOption,
            ]}
            onPress={() => setSelectedColor("Pink")}
          >
            <Text
              style={[
                styles.optionText,
                selectedColor === "Pink" && styles.selectedText,
              ]}
            >
              Pink
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedSize === "M" && styles.selectedOption,
            ]}
            onPress={() => setSelectedSize("M")}
          >
            <Text
              style={[
                styles.optionText,
                selectedSize === "M" && styles.selectedText,
              ]}
            >
              M
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Specifications</Text>
        <Text>Material: Cotton 95%, Nylon 5%</Text>
        <Text>Origin: EU</Text>
        <Text style={styles.sectionTitle}>Delivery</Text>
        <View style={styles.deliveryOption}>
          <Text>Standard</Text>
          <Text>5-7 days</Text>
          <Text>$3.00</Text>
        </View>
        <View style={styles.deliveryOption}>
          <Text>Express</Text>
          <Text>1-2 days</Text>
          <Text>$12.00</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: width, height: 400 },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeIndicator: { backgroundColor: "#555" },
  content: { padding: 20 },
  price: { fontSize: 24, fontWeight: "bold" },
  description: { color: "#666", marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  variationContainer: { flexDirection: "row", marginTop: 10 },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
  selectedOption: { backgroundColor: "#BC6C25" },
  optionText: { color: "black" },
  selectedText: { color: "white" },
  deliveryOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: "#BC6C25",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  addToCartText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default ProductDetailsPage;
