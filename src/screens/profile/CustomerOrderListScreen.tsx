import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../RootNavigator";
import CartItem from "../../components/CartItem";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";
import { Chip } from "react-native-paper";

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

  let productsToReview: any[] = [];
  if (type === "review") {
    productsToReview = orders
      .filter((order) => order.status === status)
      .flatMap((order) =>
        order.products.map((product: any) => ({
          ...product,
          orderId: order.id,
          companyName: order.companyName,
        }))
      );
  }

  const handleButtonPress = (product: any) => {
    if (type === "receive") {
      Alert.alert("Tracking", `Your order #${product.id} is being tracked.`);
    } else if (type === "review") {
      navigation.navigate("ProductReview", { productId: product.product_id });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {type === "receive" && (
          <FlatList
            data={orders.filter(
              (order) =>
                order.status.toLowerCase() === "pending" ||
                order.status.toLowerCase() === "awaiting pickup" ||
                order.status.toLowerCase() === "in transit"
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    Order ID: {item.customer_id}
                  </Text>
                  <Text style={styles.cardSubtitle}>{item.customerName}</Text>

                  <Text style={styles.cardDetail}>
                    Total Products: {item.products.length}
                  </Text>
                  <Text style={styles.cardDetail}>
                    Total: ${item.total_price}
                  </Text>
                </View>
                <Chip
                  key={item.status}
                  mode={
                    item.status === "Pending"
                      ? "flat"
                      : item.status == "In transit"
                      ? "flat"
                      : item.status == "Awaiting Pickup"
                      ? "flat"
                      : "outlined"
                  }
                  style={[
                    styles.chip,
                    {
                      backgroundColor:
                        item.status === "Pending"
                          ? "#753742"
                          : item.status === "In transit"
                          ? "#FFC107"
                          : item.status === "Awaiting Pickup"
                          ? "#0066cc"
                          : "white",
                    },
                  ]}
                  textStyle={{
                    color:
                      item.status === "Pending"
                        ? "#FFF"
                        : item.status === "In transit"
                        ? "#753742"
                        : item.status === "Awaiting Pickup"
                        ? "#fff"
                        : "#000",
                  }}
                  onPress={() => handleButtonPress(item)}
                >
                  {item.status}
                </Chip>
              </View>
            )}
          />
        )}
        {type === "review" && (
          <>
            {productsToReview.length > 0 ? (
              <FlatList
                data={productsToReview}
                keyExtractor={(item) => item.product_id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                  <CartItem
                    title={`${item.product_name} (${item.companyName})`}
                    description={`Quantity: ${item.quantity}`}
                    imageUrl={
                      item.images?.[0] || "https://via.placeholder.com/100"
                    }
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
          </>
        )}
        {type === "pay" && orders.length === 0 && (
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f4f6fa",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    backgroundColor: "#0066cc",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  chip: {
    marginRight: 8,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    minWidth: 80,
  },
});

export default CustomerOrderListScreen;
