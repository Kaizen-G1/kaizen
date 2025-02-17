import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Text, Button, FAB, IconButton } from "react-native-paper";

import Headers from "../../../components/vendor/V-header";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../RootNavigator";
import { useAppDispatch, useAppSelector } from "../../../services/constants";
import {
  deleteProductThunk,
  getProductThunk,
  ProductPayload,
} from "./slice/ProductSlice";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused
import { Swipeable } from "react-native-gesture-handler";
import AlertModal from "../../../components/alert/AlertCustomModal";

// Use your existing ProductPayload interface
type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function ProductListScreen() {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status

  const { loading, error, response } = useAppSelector(
    (state) => state.product.productList
  );

  // Check if the screen is focused (when navigating back)
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getProductThunk()); // Fetch products when the screen comes into focus
    }
  }, [dispatch, isFocused]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProductThunk()); // Refresh product list
    setRefreshing(false); // Stop the refreshing spinner
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteProductThunk(id)); // Dispatch delete action
    dispatch(getProductThunk()); // Refresh list after deletion
  };

  // Explicitly type response as { products: ProductPayload[] }
  const products: ProductPayload[] = response?.data.products || []; // Use ProductPayload interface

  const filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()) // Update to 'title' instead of 'name'
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#753742" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyLarge" style={{ color: "red" }}>
          Failed to load products: {error}
        </Text>
      </View>
    );
  }

  const renderRightActions = (id: string) => (
    <View style={styles.deleteContainer}>
      <IconButton
        icon="delete"
        iconColor="white"
        style={styles.deleteButton}
        onPress={() => handleDelete(id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Headers searchQuery={searchQuery} onSearch={setSearchQuery} />

      <FlatList
        data={filteredProducts.reverse()}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <Swipeable
            key={item.id}
            renderLeftActions={() => renderRightActions(item.id!)}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddProduct", {
                  mode: "update",
                  initialData: item,
                })
              }
            >
              <View style={styles.itemContainer}>
                {item.images && item.images.length > 0 ? (
                  <Image
                    resizeMode="cover"
                    width={60}
                    height={60}
                    borderRadius={5}
                    source={{ uri: item.images[0] }} // Use the first image from 'images' array
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>No Image</Text>
                  </View>
                )}

                <View style={styles.textContainer}>
                  <Text variant="bodyLarge" style={styles.productName}>
                    {item.title} {/* Update to 'title' */}
                  </Text>
                  <Text variant="bodyMedium" style={styles.price}>
                    ${item.price}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  compact
                  style={[
                    styles.stockStatus,
                    {
                      backgroundColor: item.inStock > 0 ? "#753742" : "#E6E6E6",
                    },
                  ]}
                  labelStyle={{
                    color: item.inStock > 0 ? "#fff" : "#666",
                    fontSize: 14,
                    fontWeight: "semibold",
                  }}
                >
                  {item.inStock > 0 ? "In Stock" : "Out of Stock"}
                </Button>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        refreshing={refreshing} // Show pull-to-refresh spinner
        onRefresh={handleRefresh} // Trigger the refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#753742"]} // You can change the color of the refresh indicator
            progressBackgroundColor="#fff" // Background color for the spinner
            tintColor="#753742" // Spinner color
          />
        }
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate("AddProduct", { mode: "add" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    backgroundColor: "red",
    marginVertical: 8,
    borderRadius: 5,
  },
  deleteButton: {
    alignSelf: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 16,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "gray",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontWeight: "bold",
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
