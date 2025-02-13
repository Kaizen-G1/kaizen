import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../RootNavigator";
import CartItem from "../../components/CartItem";
import { StackNavigationProp } from "@react-navigation/stack";

type OrderListScreenRouteProp = RouteProp<RootStackParamList, "CustomerOrderList">;

type ProductReviewRouteProp = StackNavigationProp<RootStackParamList, "ProductReview">;

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
      emptyMessage: "No orders to review.",
    },
  };

  const { title, status, emptyMessage } = screenData[type] || screenData.pay;

  // Filter orders by status dynamically
  const filteredOrders = orders.filter((order) => order.status === status);

  // Handle button press
  const handleButtonPress = (item : any) => {
    if (type === "receive") {
      Alert.alert("Tracking", `Your order #${item.id} is being tracked.`);
    } else if (type === "review") {
      navigation.navigate("ProductReview", { productId: item.id });
      
      return;
    } else {
      Alert.alert("Payment", "Redirecting to payment gateway...");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem
              title={`Order #${item.id}`}
              description={`Status: ${item.status}`}
            //   price={`$${item.total_price}`}
              imageUrl="https://via.placeholder.com/100" // You can change this dynamicallyinitialQuantity={item.quantity}
              isWish={false}
              buttonLabel={screenData[type].buttonLabel}
              isCompleted={true}
              onRemove={() => {}}
              onPress={() => {}}
              onQuantityChange={() => {}}
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
