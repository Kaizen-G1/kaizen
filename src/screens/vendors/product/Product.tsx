import React, { useState } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { Avatar, Text, Button, FAB } from "react-native-paper";

import Headers from "../../../components/vendor/V-header";
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Slipper Female",
    price: "$200",
    image:
      "https://i.pinimg.com/736x/17/c8/28/17c828628eddc7841b8a3d2f307ada9f.jpg", // Replace with actual image
    inStock: true,
  },
  {
    id: "2",
    name: "Nike Shoes",
    price: "$1,200",
    image:
      "https://i.pinimg.com/736x/b1/f8/ba/b1f8ba3a949f6c5ab5810e0a914f45e9.jpg", // Replace with actual image
    inStock: false,
  },
];

export default function ProductListScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((order) => {
    const matchesSearch = order.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Headers searchQuery={searchQuery} onSearch={setSearchQuery} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              resizeMode="cover"
              width={60}
              height={60}
              borderRadius={5}
              source={{ uri: item.image }}
              style={{ backgroundColor: "gray" }}
            />
            <View style={styles.textContainer}>
              <Text variant="bodyLarge" style={styles.productName}>
                {item.name}
              </Text>
              <Text variant="bodyMedium" style={styles.price}>
                {item.price}
              </Text>
            </View>
            <Button
              mode="contained"
              compact
              style={[
                styles.stockStatus,
                { backgroundColor: item.inStock ? "#753742" : "#E6E6E6" },
              ]}
              labelStyle={{
                color: item.inStock ? "#fff" : "#666",
                fontSize: 14,
                fontWeight: "semibold",
              }}
            >
              {item.inStock ? "In Stock" : "Out of Stock"}
            </Button>
          </View>
        )}
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => {
          console.log("Add Product");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontWeight: "medium",
    fontSize: 16,
  },
  price: {
    color: "#666",
    fontSize: 14,
  },
  stockStatus: {
    borderRadius: 4,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 50,
    backgroundColor: "#753742",
  },
});
