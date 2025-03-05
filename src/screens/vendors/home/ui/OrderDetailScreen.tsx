import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Text, Button, Card, List, Divider, Menu } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../../services/constants";
import { fetchOrderById } from "../slice/OrderSlice";
import { OrderStatus } from "../../../../utils/enums";

export default function OrderDetailScreen() {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const dispatch = useAppDispatch();
  const { selectedOrder, loading } = useAppSelector((state) => state.orders);

  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(OrderStatus.Unknown);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (selectedOrder) {
      const validStatus = Object.values(OrderStatus).includes(selectedOrder.status as OrderStatus)
        ? (selectedOrder.status as OrderStatus)
        : OrderStatus.Unknown;

      setSelectedStatus(validStatus);
    }
  }, [selectedOrder]);

  if (loading || !selectedOrder) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  const handleStatusChange = (status: OrderStatus) => {
    setSelectedStatus(status);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Order Details" style={styles.cardTitle} />
        <Card.Content>
          <List.Section>
            <List.Item
              title="Customer ID"
              description={selectedOrder.customer_id}
              left={() => <List.Icon icon="account" />}
            />
            <Divider />
            <List.Item
              title="Order ID"
              description={selectedOrder.id}
              left={() => <List.Icon icon="identifier" />}
            />
            <Divider />
            <List.Item
              title="Total Price"
              description={`$${selectedOrder.total_price.toFixed(2)}`}
              left={() => <List.Icon icon="currency-usd" />}
            />
            <Divider />
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Menu
                visible={statusMenuVisible}
                onDismiss={() => setStatusMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setStatusMenuVisible(true)}
                    style={styles.statusButton}
                  >
                    {selectedStatus ?? "Select Status"}
                  </Button>
                }
              >
                {Object.values(OrderStatus).map((status) => (
                  <Menu.Item
                    key={status}
                    onPress={() => {
                      handleStatusChange(status);
                      setStatusMenuVisible(false);
                    }}
                    title={status ?? "Unknown"}
                  />
                ))}
              </Menu>
            </View>
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Products" />
        <Card.Content>
          {selectedOrder.products.map((product, index) => (
            <View key={index}>
              <List.Item
                title={product.product_name || product.product_id}
                description={`Quantity: ${product.quantity}`}
                left={() => <List.Icon icon="cube-outline" />}
                right={() => (
                  <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
                )}
              />
              <Divider />
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        icon="pencil"
      >
        Update Order
      </Button>

      <Button
        mode="contained"
        style={[styles.button, styles.deleteButton]}
        icon="delete"
      >
        Delete Order
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    marginTop: 30,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  statusButton: {
    borderColor: "#888",
  },
  price: {
    fontSize: 16,
    color: "#333",
    alignSelf: "center",
  },
  button: {
    marginTop: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
  },
});
