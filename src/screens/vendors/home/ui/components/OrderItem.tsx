import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Order } from "../../data/OrderTypes";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
}

export default function OrderItem({ order }: Props) {
  const formattedId = order.id ? order.id.slice(-5).toUpperCase() : "N/A";
  return (
    <View style={styles.orderItem}>
      <View style={styles.textContainer}>
        <Text style={styles.orderId}>Order #{formattedId}</Text>
        <Text style={styles.customerName}>{order.customerName || "Unknown Customer"}</Text>
        <Text style={styles.totalPrice}>Total: ${order.total_price ? order.total_price.toFixed(2) : "0.00"}</Text>
      </View>
      <StatusBadge status={order.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  textContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#753742",
  },
  customerName: {
    fontSize: 13,
    color: "#333",
  },
  totalPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#007bff",
  },
});
