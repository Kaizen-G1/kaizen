import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { ProductPayload } from "../screens/vendors/product/slice/ProductSlice";
import ProductItem from "./ProductItem";

const { width } = Dimensions.get("window");

interface LazyProductGridProps {
  allProducts: ProductPayload[];
  navigation: NavigationProp<any>;
}

const LazyProductGrid: React.FC<LazyProductGridProps> = ({
  allProducts,
  navigation,
}) => {
  const [visibleProducts, setVisibleProducts] = useState<ProductPayload[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const loadMoreProducts = () => {
    if (isLoading) return;

    setIsLoading(true);

    // Simulate delay before loading new items
    setTimeout(() => {
      const start = (page - 1) * itemsPerPage;
      const end = page * itemsPerPage;
      const nextItems = allProducts.slice(start, end);

      if (nextItems.length > 0) {
        setVisibleProducts((prev) => [...prev, ...nextItems]);
        setPage((prev) => prev + 1);
      }

      setIsLoading(false);
    }, 100); // 600ms delay
  };

  useEffect(() => {
    setVisibleProducts([]);
    setPage(1);
    loadMoreProducts(); // Initial load
  }, [allProducts]);

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={visibleProducts}
      keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
      renderItem={({ item }) => (
        <ProductItem
          productCardstyle={{ width: width / 2 - 20 }}
          imageStyle={{ height: 250 }}
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
      columnWrapperStyle={styles.columnWrapper}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size="large" color="#000" style={styles.loader} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    columnGap: 10,
  },
  loader: {
    marginVertical: 16,
  },
});

export default LazyProductGrid;
