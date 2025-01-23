import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import CustomIcon from "tenzai-components/components/CustomIcon/CustomIcon";

type Product = {
  id: string;
  title: string;
  count: number;
  price: number;
  stock: number;
  images: string;
};

type HeaderSectionProps = {
  onPressSeeAll: () => void;
};

type ProductCardProps = {
  item: Product;
};

type HorizontalProductListProps = {
  products: {
    id: string;
    title: string;
    count: number;
    price: number;
    stock: number;
    images: string;
  }[];
  onPressSeeAll: () => void;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ onPressSeeAll }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>New Items</Text>
      <TouchableOpacity onPress={onPressSeeAll} style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See All</Text>
        <CustomIcon icon='arrow-right' type='circle'/>
      </TouchableOpacity>
    </View>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
    <View style={styles.productCard}>
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images }} style={styles.productImage} />
      </View>
      </Card>
      <View style={styles.itemsFooterContainer}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({ products, onPressSeeAll }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <HeaderSection onPressSeeAll={onPressSeeAll} />

      {/* Product List */}
      <View  style={styles.listcontainer}>
        <FlatList
          horizontal
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard item={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>      
    </View>
  );
};

export default HorizontalProductList;

const styles = StyleSheet.create({  
  card: {
    borderRadius: 9,
    backgroundColor: '#fff',
    padding: 7,
    marginLeft: 5
  },
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  listcontainer:{    
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#b22222",
    marginRight: 5,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 5,
  },
  productCard: {
    borderRadius: 10,
    alignItems: "center",
    width: 145,
    height: 200,
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
    fontSize: 14,
    marginVertical: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
