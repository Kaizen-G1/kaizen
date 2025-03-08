import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Order } from "../../data/OrderTypes";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
}

export default function OrderItem({ order }: Props) {
  return (
    <View style={styles.orderItem}>
      <View>
        <Text variant="titleSmall">{order.customer_id}</Text>
        <Text variant="bodySmall">Total Price: ${order.total_price.toFixed(2)}</Text>
        {order.products.map((product, index) => (
          <Text key={index} variant="bodySmall">
            {product.product_name || product.product_id} (x{product.quantity})
          </Text>
        ))}
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
});
