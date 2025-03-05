import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../../services/constants";
import { fetchOrderById } from "../slice/OrderSlice";


export default function OrderDetailScreen() {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const dispatch = useAppDispatch();
  const { selectedOrder, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  if (loading || !selectedOrder) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedOrder.customer_id}</Text>
      <Text style={styles.info}>Order ID: {selectedOrder.id}</Text>
      {/* {.toFixed(2)} TODO: Check price formtting */}
      {/* <Text style={styles.info}>Total Price: ${selectedOrder.total_price.toString()}</Text> */}

      {/* {selectedOrder.products.map((product, index) => (
        <Text key={index} style={styles.product}>
          {product.product_name || product.product_id} (x{product.quantity})
        </Text>
      ))} */}

      <Button mode="contained" style={styles.button} onPress={() => console.log("Update order")}>
        Update Order
      </Button>
      <Button mode="contained" style={[styles.button, { backgroundColor: "red" }]} onPress={() => console.log("Delete order")}>
        Delete Order
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  product: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    marginTop: 15,
  },
});
