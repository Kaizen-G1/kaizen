import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import {
  Text,
  Button,
  Card,
  TextInput,
  Modal,
  Portal,
  Appbar,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../../services/constants";
import { fetchOrderById, updateOrderStatus } from "../slice/OrderSlice";
import { OrderStatus } from "../../../../utils/enums";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

export default function OrderDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId } = route.params as { orderId: string };
  const dispatch = useAppDispatch();
  const { selectedOrder, loading } = useAppSelector((state) => state.orders);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    OrderStatus.Unknown
  );
  const [pickerVisible, setPickerVisible] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    totalPrice: "",
  });

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
      if (selectedOrder) {
          console.log("Fetched Order Data:", selectedOrder);
      }
  }, [selectedOrder]);

  useEffect(() => {
    if (selectedOrder) {
      setForm({
        customerName: selectedOrder.customerName || "",
        customerPhone: selectedOrder.customerPhone || "",
        totalPrice: selectedOrder.total_price?.toFixed(2) || "0.00",
      });

      const validStatus = Object.values(OrderStatus).includes(
        selectedOrder.status as OrderStatus
      )
        ? (selectedOrder.status as OrderStatus)
        : OrderStatus.Unknown;

      setSelectedStatus(validStatus);
    }
  }, [selectedOrder]);

  if (loading || !selectedOrder) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  const handleStatusChange = (status: OrderStatus) => {
    setSelectedStatus(status);
    setPickerVisible(false);
  };

  const handleUpdateOrder = () => {
    if (selectedOrder) {
      dispatch(
        updateOrderStatus({ orderId: selectedOrder.id, status: selectedStatus })
      )
        .then(() => {
          Alert.alert("Success", "Order status updated successfully.");
          navigation.goBack();
        })
        .catch((error) => {
          // TODO: Workaround, check error and show appropriate alert
          // Alert.alert("Error", "Failed to update order status.");
          // console.error("Error updating order:", error);
          navigation.goBack();
        });
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Order Details" />
      </Appbar.Header>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <Card style={styles.card}>
          <Card.Content>
          <TextInput
              label="Order ID"
              value={selectedOrder.id.slice(-5).toUpperCase()}
              mode="outlined"
              disabled
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }}
              style={styles.input}
            />
            <TextInput
              label="Customer Name"
              value={form.customerName}
              disabled
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, customerName: text }))
              }
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Customer Phone"
              value={form.customerPhone}
              disabled
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, customerPhone: text }))
              }
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              label="Total Price"
              value={form.totalPrice}
              mode="outlined"
              keyboardType="numeric"
              disabled
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Products" />
          <Card.Content>
            {selectedOrder.products.length > 0 ? (
              selectedOrder.products.map((product, index) => {
                const formattedId =
                  product.product_id && product.product_id.length >= 5
                    ? product.product_id.slice(-5).toUpperCase()
                    : "N/A";

                const totalPrice = (product.price ?? 0) * (product.quantity ?? 1);

                return (
                  <View key={index} style={styles.productItemContainer}>
                    <Image
                      source={{
                        uri:
                          product.image && product.image.length > 0
                            ? product.image
                            : "https://images.unsplash.com/photo-1628842456883-f8d529168be9",
                      }}
                      style={styles.productImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.productTitle}>
                        {product.product_name || "Unknown Product"} (x{product.quantity})
                      </Text>
                      <Text style={styles.productId}>ID: {formattedId}</Text>
                      <Text style={styles.productPrice}>
                        ${product.price?.toFixed(2) ?? "0.00"} | Total: ${totalPrice.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.noProductsText}>No products in this order.</Text>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Order Status" />
          <Card.Content>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setPickerVisible(true)}
            >
              <Text style={styles.pickerButtonText}>{selectedStatus}</Text>
            </TouchableOpacity>

            <Portal>
              <Modal
                visible={pickerVisible}
                onDismiss={() => setPickerVisible(false)}
                contentContainerStyle={styles.pickerContainer}
              >
                <Picker
                  selectedValue={selectedStatus}
                  onValueChange={(itemValue) =>
                    handleStatusChange(itemValue as OrderStatus)
                  }
                >
                  {Object.values(OrderStatus).map((status) => (
                    <Picker.Item key={status} label={status} value={status} />
                  ))}
                </Picker>
                <Button onPress={() => setPickerVisible(false)}>Close</Button>
              </Modal>
            </Portal>
          </Card.Content>
        </Card>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <CustomButton
            label="Update Order"
            onPress={handleUpdateOrder}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
  input: {
    marginBottom: 10,
  },
  pickerButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#753742",
    alignItems: "center",
    backgroundColor: "#753742",
  },
  pickerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  productContainer: {
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    color: "gray",
  },
  card: {
    borderRadius: 10,
  },
  productItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
  noProductsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
  productId: {
    fontSize: 12,
    color: "gray",
  },
});
