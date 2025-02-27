import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import Header from "../../components/vendor/V-header";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import { getOrdersThunk, Order } from "./slice/OrderSlice";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return { backgroundColor: "#315731", icon: "bell-alert" };
    case "Awaiting Pickup":
      return { backgroundColor: "#BC6C25", opacity: 0.8, icon: "package-variant-closed" };
    case "In transit":
      return { backgroundColor: "#0754E4", icon: "truck-delivery" };
    case "Complete":
      return { backgroundColor: "#EAFFEA", icon: "check-circle", textcolor: "#324E33" };
    case "Cancelled":
      return { backgroundColor: "#9B2C2D", icon: "close-circle" };
    default:
      return { backgroundColor: "#000", icon: "alert" };
  }
};

export default function OrderListScreen() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || order.status.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#753742" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="bodyLarge" style={{ color: "red" }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header searchQuery={searchQuery} onSearch={setSearchQuery} />

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {["All", "Pending", "Awaiting Pickup", "In transit", "Complete", "Cancelled"].map((filter, index) => (
              <Chip
                key={index}
                mode={selectedFilter === filter ? "flat" : "outlined"}
                style={[
                  styles.chip,
                  {
                    backgroundColor: selectedFilter === filter ? "#753742" : "transparent",
                    borderColor: "#753742",
                  },
                ]}
                textStyle={{ color: selectedFilter === filter ? "#FFF" : "black" }}
                onPress={() => setSelectedFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredOrders}
          scrollEnabled={false}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const statusStyle = getStatusStyle(item.status);
            return (
              <View style={styles.orderItem}>
                <View>
                  <Text variant="titleSmall">{item.customer_id}</Text>
                  <Text variant="bodySmall">Total Price: ${item.total_price.toFixed(2)}</Text>
                  {item.products.map((product, index) => (
                    <Text key={index} variant="bodySmall">
                      {product.product_name || product.product_id} (x{product.quantity})
                    </Text>
                  ))}
                </View>
                <Button
                  mode="contained"
                  style={[styles.statusButton, { backgroundColor: statusStyle.backgroundColor,
                    opacity: statusStyle.opacity, }]}
                  labelStyle={{ color: statusStyle.textcolor ?? "#FFF", fontSize: 14 }}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Button>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  filterContainer: { height: 50, marginBottom: 16 },
  scrollViewContent: { alignItems: "center", paddingHorizontal: 20 },
  chip: { marginRight: 8, height: 35, justifyContent: "center", alignItems: "center", paddingHorizontal: 12, minWidth: 80 },
  orderItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  statusButton: { borderRadius: 4 },
});
