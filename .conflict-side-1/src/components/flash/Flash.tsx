import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DiscountBadge from "../DiscountBadge";
import ProductItem from "../ProductItem";
import FlashSaleHeader from "../FlashSaleHeader";
import Banner from "../banner/test";

interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
}

const products: Product[] = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$16,00",
    originalPrice: "$20,00",
    image: "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d",
    discount: "20%",
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$18,00",
    originalPrice: "$20,00",
    image: "https://images.unsplash.com/photo-1603251579431-8041402bdeda",
    discount: "10%",
  },
  {
    id: "3",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$14,00",
    originalPrice: "$20,00",
    image: "https://images.unsplash.com/photo-1602810316693-3667c854239a",
    discount: "30%",
  },
  {
    id: "4",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$12,00",
    originalPrice: "$20,00",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    discount: "40%",
  },
  {
    id: "5",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$10,00",
    originalPrice: "$20,00",
    image: "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c",
    discount: "50%",
  },
  {
    id: "6",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$16,00",
    originalPrice: "$20,00",
    image: "https://plus.unsplash.com/premium_photo-1690338237128-b32fedb44d55",
    discount: "20%",
  },
  {
    id: "7",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$18,00",
    originalPrice: "$20,00",
    image: "https://plus.unsplash.com/premium_photo-1690340192770-3460a6c5067c",
    discount: "10%",
  },
  {
    id: "8",
    title: "Lorem ipsum dolor sit amet consectetur",
    price: "$14,00",
    originalPrice: "$20,00",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    discount: "30%",
  },
];

const FlashSalePage = () => {
  const [selectedDiscount, setSelectedDiscount] = useState("All");

  const filteredProducts =
    selectedDiscount === "All"
      ? products
      : products.filter((product) => product.discount === selectedDiscount);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <DiscountBadge discountPercentage={item.discount} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlashSaleHeader hours={"00"} minutes={"10"} remainingSeconds={"49"} />

      <Text style={styles.subHeader}>Choose Your Discount</Text>
      <View style={styles.filterRow}>
        {[
          { label: "All", value: "All" },
          { label: "10%", value: "10%" },
          { label: "20%", value: "20%" },
          { label: "30%", value: "30%" },
          { label: "40%", value: "40%" },
          { label: "50%", value: "50%" },
        ].map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedDiscount === filter.value && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedDiscount(filter.value)}
          >
            <Text
              style={[
                styles.filterText,
                selectedDiscount === filter.value && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.discountHeader}>{selectedDiscount} Discount</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            title={item.title}
            price={item.price}
            originalPrice={item.originalPrice || undefined} // Pass undefined if no original price
            image={item.image}
            discount={item.discount}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false} // Disable FlatList's internal scrolling
      />
      <Banner
        imageUrl="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
        title="Big Sale"
        subtitle="Up to 50%"
        caption="Happening Now"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 16,
    marginLeft: 8,
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    marginHorizontal: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
    transform: [{ scale: 1 }],
  },
  activeFilterButton: {
    borderColor: "#753742",
    backgroundColor: "#fff",
    borderWidth: 2,
    transform: [{ scale: 1.1 }],
  },
  filterText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },
  activeFilterText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },
  discountHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  productList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productCard: {
    borderRadius: 8,
    marginBottom: 16,
    width: "48%",
  },
  productImageContainer: {
    borderRadius: 9,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    // Elevation for Android
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

export default FlashSalePage;
