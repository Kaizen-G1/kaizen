import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Text,
  Button,
  Card,
  TextInput,
  Divider,
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
          Alert.alert("Error", "Failed to update order status.");
          console.error("Error updating order:", error);
        });
    }
  };

  return (
    <>
      {/* Header con botón de regreso */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Order Details" />
      </Appbar.Header>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.headerText}>Order Information</Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Order ID"
              value={selectedOrder.id}
              mode="outlined"
              disabled
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }} // ✅ Cambia color de fondo y borde
              style={styles.input}
            />
            <TextInput
              label="Customer Name"
              value={form.customerName}
              disabled
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }} // ✅ Cambia color de fondo y borde
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
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }} // ✅ Cambia color de fondo y borde
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
              theme={{ colors: { background: "#f0f0f0", primary: "#aaa" } }} // ✅ Cambia color de fondo y borde
              style={styles.input}
            />
          </Card.Content>
        </Card>

        {/* Estado de la orden */}
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

        {/* Lista de productos */}
        <Card style={styles.card}>
          <Card.Title title="Products" />
          <Card.Content>
            {selectedOrder.products.length > 0 ? (
              selectedOrder.products.map((product, index) => (
                <View key={index} style={styles.productContainer}>
                  <Text style={styles.productText}>
                    {product.product_name || product.product_id}
                  </Text>
                  <Text>Quantity: {product.quantity}</Text>
                  <Text style={styles.price}>
                    ${product.price?.toFixed(2)}
                  </Text>
                  <Divider />
                </View>
              ))
            ) : (
              <Text style={styles.noProductsText}>
                No products in this order.
              </Text>
            )}
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
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
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
    color: "#555",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    // marginBottom: 12,
    borderRadius: 10,
    // padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  pickerButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    alignItems: "center",
  },
  pickerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#007bff",
  },
  noProductsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});
