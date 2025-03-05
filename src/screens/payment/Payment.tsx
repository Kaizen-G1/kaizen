import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Badge, Banner, Icon, IconButton } from "react-native-paper";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";
import { RootStackParamList } from "../../../RootNavigator";
import { set } from "mongoose";

type Props = StackScreenProps<RootStackParamList, "Payment">;

const PaymentScreen: React.FC<Props> = ({ route }) => {
  const { cart, subTotal } = route.params;
  // Local states for shipping & contact info

  const [shippingAddress, setShippingAddress] = useState(
    "50 Charles Street East, Toronto ON M5C 0A6"
  );
  const [total, setTotal] = useState(subTotal);
  const [contactPhone, setContactPhone] = useState("+1 493-200-0000");
  const [contactEmail, setContactEmail] = useState("romania@example.com");

  // Modal visibility states
  const [shippingModalVisible, setShippingModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  // Shipping option state
  const [selectedShipping, setSelectedShipping] = useState<
    "standard" | "express"
  >("standard");

  // Handlers for shipping selection
  const handleShippingSelect = (option: "standard" | "express") => {
    setSelectedShipping(option);
    if (option === "standard") {
      setTotal(subTotal);
    } else if (option === "express") {
      setTotal(subTotal + 12.0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Page Title */}
        {/* <Text style={styles.headerTitle}>Payment</Text> */}

        {/* SHIPPING ADDRESS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <IconButton
              icon="pencil"
              iconColor="white"
              size={20}
              style={styles.circleButton}
              onPress={() => setShippingModalVisible(true)}
            />
          </View>
          <Text style={styles.sectionDescription}>{shippingAddress}</Text>
        </View>

        {/* CONTACT INFORMATION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <IconButton
              icon="pencil"
              iconColor="white"
              size={20}
              style={styles.circleButton}
              onPress={() => setContactModalVisible(true)}
            />
          </View>
          <Text style={styles.sectionDescription}>{contactPhone}</Text>
          <Text style={styles.sectionDescription}>{contactEmail}</Text>
        </View>

        {/* ITEMS */}
        <View style={styles.sectionContainer}>
          <View style={styles.itemsHeader}>
            <Text style={styles.sectionTitle}>Items</Text>
            <TouchableOpacity style={styles.voucherButton}>
              <Text style={styles.voucherButtonText}>Add Voucher</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            scrollEnabled={false}
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Image
                  source={{
                    uri: (item.product.images && item.product.images[0]) || "",
                  }}
                  style={styles.itemImage}
                />
                <Badge style={styles.badge}>{item.quantity}</Badge>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.product.title || "Lorem ipsum dolor sit amet."}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>${item.product.price}</Text>
              </View>
            )}
          />
        </View>

        {/* SHIPPING OPTIONS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Shipping Options</Text>

          {/* Standard */}
          <TouchableOpacity
            style={styles.shippingOptionRow}
            onPress={() => handleShippingSelect("standard")}
          >
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  selectedShipping === "standard" && styles.radioSelected,
                ]}
              >
                {selectedShipping === "standard" && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.shippingOptionLabel}>Standard</Text>
            </View>
            <View style={styles.shippingInfoContainer}>
              <Text style={styles.shippingTime}>5-7 days</Text>
              <Text style={styles.shippingPrice}>FREE</Text>
            </View>
          </TouchableOpacity>

          {/* Express */}
          <TouchableOpacity
            style={styles.shippingOptionRow}
            onPress={() => handleShippingSelect("express")}
          >
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  selectedShipping === "express" && styles.radioSelected,
                ]}
              >
                {selectedShipping === "express" && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.shippingOptionLabel}>Express</Text>
            </View>
            <View style={styles.shippingInfoContainer}>
              <Text style={styles.shippingTime}>1-2 days</Text>
              <Text style={styles.shippingPrice}>$12.00</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.deliveryInfo}>
            Delivered on or before Thursday, 23 April 2020
          </Text>
        </View>

        {/* PAYMENT METHOD */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.paymentMethod}>Card</Text>
        </View>

        {/* FOOTER (Total & Pay button) */}
        <View style={styles.footerContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total}</Text>
          </View>
          <CustomButton label="Pay" type="primary" onPress={() => {}} />
        </View>
      </ScrollView>

      {/* Edit Shipping Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={shippingModalVisible}
        onRequestClose={() => setShippingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Shipping Address</Text>
            <TextInput
              style={styles.modalTextInput}
              value={shippingAddress}
              onChangeText={setShippingAddress}
              placeholder="Enter shipping address"
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setShippingModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShippingModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Contact Information Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => setContactModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Contact Information</Text>
            <TextInput
              style={styles.modalTextInput}
              value={contactPhone}
              onChangeText={setContactPhone}
              placeholder="Enter phone number"
            />
            <TextInput
              style={styles.modalTextInput}
              value={contactEmail}
              onChangeText={setContactEmail}
              placeholder="Enter email address"
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setContactModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setContactModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  sectionContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#202020",
  },
  sectionDescription: {
    fontSize: 15,
    color: "#000",
    marginBottom: 4,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#753742",
    justifyContent: "center",
    alignItems: "center",
  },
  circleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  itemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  badge: {
    backgroundColor: "#B23850",
    borderRadius: 20,
    position: "absolute",
    top: 2,

    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },

  voucherButton: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  voucherButtonText: {
    fontSize: 14,
    color: "#B23850",
    fontWeight: "600",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 6,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 4,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  shippingOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 6,
    justifyContent: "space-between",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#B23850",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#B23850",
  },
  shippingOptionLabel: {
    fontSize: 14,
    color: "#333",
  },
  shippingInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  shippingTime: {
    fontSize: 12,
    color: "#666",
    marginRight: 10,
  },
  shippingPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  deliveryInfo: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
  paymentMethod: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  footerContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  payButton: {
    backgroundColor: "#B23850",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    backgroundColor: "#B23850",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
