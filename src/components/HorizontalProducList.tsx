import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import CustomIcon from "kaizen-components/components/CustomIcon/CustomIcon";
import { ProductPayload } from "../screens/vendors/product/slice/ProductSlice";
import ProductItem from "./ProductItem";

type Product = {
  id: string;
  title: string;
  count: number;
  price: number;
  stock: number;
  image: string;
};

type HeaderSectionProps = {
  onPressSeeAll: () => void;
};

type ProductCardProps = {
  item: Product;
};

type HorizontalProductListProps = {
  products: ProductPayload[];
  onPressSeeAll: () => void;
};

const ProductCard: React.FC<{ item: ProductPayload }> = ({ item }) => {
  return (
    <View style={styles.productCard}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        </View>
      </Card>
      <View style={styles.itemsFooterContainer}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </View>
  );
};

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({
  products,
  onPressSeeAll,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>New Items</Text>
        <TouchableOpacity onPress={onPressSeeAll} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <CustomIcon icon="arrow-right" type="circle" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ paddingHorizontal: 20, paddingVertical: 10, marginRight: 20 }}
        horizontal
        data={products.slice(0, 5)}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <ProductItem
            productCardstyle={{ width: 140 }}
            imageStyle={{ height: 170 }}
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
            onPress={() => console.log("Product clicked:", item.title)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HorizontalProductList;

const styles = StyleSheet.create({
  card: {
    borderRadius: 9,
    backgroundColor: "#fff",
    padding: 7,
    marginLeft: 5,
  },
  container: {
    marginBottom: 15,
  },

  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 5,
  },
  productCard: {
    borderRadius: 10,
    alignItems: "center",
    width: 145,
  },
  productImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
  },
  itemsFooterContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
