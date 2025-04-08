import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../RootNavigator";
import CartItem from "../../components/CartItem";
import { StackNavigationProp } from "@react-navigation/stack";

type OrderListScreenRouteProp = RouteProp<
  RootStackParamList,
  "CustomerOrderList"
>;
type ProductReviewRouteProp = StackNavigationProp<
  RootStackParamList,
  "ProductReview"
>;

const CustomerOrderListScreen = () => {
  const route = useRoute<OrderListScreenRouteProp>();
  const navigation = useNavigation<ProductReviewRouteProp>();
  const { type, orders } = route.params;

  // Define dynamic labels and filter conditions
  const screenData = {
    pay: {
      title: "Orders To Pay",
      status: "Pending",
      buttonLabel: "Pay",
      emptyMessage: "No orders to pay.",
    },
    receive: {
      title: "To Receive",
      status: "In transit",
      buttonLabel: "Track",
      emptyMessage: "No orders to receive.",
    },
    review: {
      title: "Orders To Review",
      status: "Complete",
      buttonLabel: "Review",
      emptyMessage: "No products to review.",
    },
  };

  const { title, status, emptyMessage } = screenData[type] || screenData.pay;

  // Filter products that belong to completed orders (for review)
  let productsToReview: any[] = [];
  if (type === "review") {
    productsToReview = orders
      .filter((order) => order.status === status)
      .flatMap((order) =>
        order.products.map((product: any) => ({
          ...product,
          orderId: order.id, // Keep track of which order this product belongs to
          companyName: order.companyName,
        }))
      );
  }

  console.log("Products to reviews:", productsToReview);

  // Handle button press for reviewing a product
  const handleButtonPress = (product: any) => {
    if (type === "receive") {
      Alert.alert(
        "Tracking",
        `Your order #${product.product_id} is being tracked.`
      );
    } else if (type === "review") {
      console.log("Product ID:", product);
      navigation.navigate("ProductReview", { productId: product.product_id });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {productsToReview.length > 0 ? (
        <FlatList
          data={productsToReview}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <CartItem
              title={`${item.product_name} (${item.companyName})`}
              description={`Quantity: ${item.quantity}`}
              imageUrl={item.images?.[0] || "https://via.placeholder.com/100"}
              isWish={false}
              price={item.price}
              buttonLabel="Review"
              isCompleted={true}
              onWishPress={() => handleButtonPress(item)}
            />
          )}
        />
      ) : (
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyText: { fontSize: 18, color: "#666", marginTop: 20 },
});

export default CustomerOrderListScreen;
