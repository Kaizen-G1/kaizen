import React, { useState, useEffect } from "react";
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
import DiscountBadge from "../../../components/DiscountBadge";
import ProductItem from "../../../components/ProductItem";
import FlashSaleHeader from "../../../components/FlashSaleHeader";
import Banner from "../../../components/banner/Banner";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../RootNavigator";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
}

type Props = StackScreenProps<RootStackParamList, "FlashShowAll">;

const FlashShowAll: React.FC<Props> = ({ navigation, route }) => {
  const { products, timeLeftSale } = route.params || {};

  const [timeLeft, setTimeLeft] = useState(timeLeftSale);

  const [isTimerActive, setIsTimerActive] = useState(true);

  const [selectedDiscount, setSelectedDiscount] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimerActive(false);
      return;
    }

    if (isTimerActive) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, isTimerActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

    return { hours, minutes, remainingSeconds };
  };

  const { hours, minutes, remainingSeconds } = formatTime(timeLeft);

  const filteredProducts =
    selectedDiscount === 0
      ? products
      : products.filter((product) => {
          switch (selectedDiscount) {
            case 10:
              return product.discount <= 10 && product.discount > 0;
            case 20:
              return product.discount <= 20 && product.discount > 10;
            case 30:
              return product.discount <= 30 && product.discount > 20;
            case 40:
              return product.discount <= 40 && product.discount > 30;
            case 50:
              return product.discount <= 50 && product.discount > 40;
            default:
              return product;
          }
        });

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <FlashSaleHeader
            hours={hours}
            minutes={minutes}
            remainingSeconds={remainingSeconds}
          />

          <Text style={styles.subHeader}>Choose Your Discount</Text>
          <View style={styles.filterRow}>
            {[
              { label: "All", value: 0 },
              { label: "10%", value: 10 },
              { label: "20%", value: 20 },
              { label: "30%", value: 30 },
              { label: "40%", value: 40 },
              { label: "50%", value: 50 },
            ].map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  selectedDiscount === filter.value &&
                    styles.activeFilterButton,
                ]}
                onPress={() => setSelectedDiscount(filter.value)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedDiscount === filter.value &&
                      styles.activeFilterText,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.discountHeader}>
            {selectedDiscount === 0 ? "All" : `${selectedDiscount}%`} Discount
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductItem
                title={item.title}
                price={`$${item.flashSalePrice}`}
                originalPrice={item.price.toString() || undefined}
                image={item.images[0]}
                discount={item.discount.toString()}
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
          <Banner
            imageUrl="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
            title="Big Sale"
            subtitle="Up to 50%"
            caption="Happening Now"
          />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FlashShowAll;

const styles = StyleSheet.create({
  container: {
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
});
