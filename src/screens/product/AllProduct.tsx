import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text } from "react-native-paper";
import ProductItem from "../../components/ProductItem";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import { useIsFocused } from "@react-navigation/native";
import {
  getProductThunk,
  ProductPayload,
} from "../vendors/product/slice/ProductSlice";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";

type AllProductNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AllProduct"
>;

export default function AllProduct() {
  const navigation = useNavigation<AllProductNavigationProps>();

  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const { error, response } = useAppSelector(
    (state) => state.product.productList
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(getProductThunk());
    }
  }, [dispatch, isFocused]);

  const products: ProductPayload[] = response?.data.products || [];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text variant="bodyLarge" style={{ color: "red" }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={[styles.input, styles.textInput]}
        placeholder="Search"
        mode="outlined"
        activeOutlineColor="#753742"
        outlineColor="transparent"
        selectionColor="#753742"
        placeholderTextColor="#BEBEBE"
        value={searchQuery}
        onChangeText={setSearchQuery}
        outlineStyle={{ borderRadius: 10, borderColor: "#753742" }}
      />

      <FlatList
        data={filteredProducts.reverse()}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <ProductItem
            title={item.title}
            price={"$" + item.price.toString()}
            originalPrice={"$" + item.costPrice.toString()}
            image={
              item.images.length > 0
                ? item.images[0]
                : "https://images.unsplash.com/photo-1628842456883-f8d529168be9"
            }
            isDiscounted={false}
            discount={"0"}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                productId: item.id?.toString() ?? "",
                product: item,
              })
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 45,
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
  input: {
    height: 50,
    backgroundColor: "#fff",

    marginVertical: 10,
    marginHorizontal: 20,
  },
  textInput: {
    color: "black",
  },
});
