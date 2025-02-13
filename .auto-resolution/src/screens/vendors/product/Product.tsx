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
import { useIsFocused } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import AlertModal from "../../../components/alert/AlertCustomModal";

import { resetSelectedCategory } from "../../category/slice/CategorySlice";

type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function ProductListScreen() {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const { loading, error, response } = useAppSelector(
    (state) => state.product.productList
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getProductThunk());
    const unsubscribe = navigation.addListener("focus", () => {
      if (isFocused) {
        dispatch(getProductThunk());
      }
    });

    //on unmount
    dispatch(resetSelectedCategory());
    return unsubscribe;
  }, [dispatch, isFocused, navigation]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProductThunk());
    setRefreshing(false);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteProductThunk(id));
    dispatch(getProductThunk());
  };

  const products: ProductPayload[] = response?.data.products || [];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#753742" />
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
      <Headers
        title={"sd"}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      {error && (
        <AlertModal
          title="Error"
          message={`Failed to load products: ${error}`}
          visible={!!error}
          isError={true}
          btnlabel="Rety"
          onPress={() => dispatch(getProductThunk())}
        />
      )}
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
        refreshing={refreshing}
        onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#753742"]}
            progressBackgroundColor="#fff"
            tintColor="#753742"
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
