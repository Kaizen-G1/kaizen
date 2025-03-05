import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { IconButton, Card, PaperProvider } from "react-native-paper";
import CustomIcon from "tenzai-components/components/CustomIcon/CustomIcon";
import Counter from "../../components/counter/Counter";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CartItem from "../../components/CartItem";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  CartPayload,
  deleteFromCartThunk,
  getCartThunk,
  updateSubTotal,
} from "./slice/CartSlice";

type CartItemProps = StackNavigationProp<RootStackParamList, "Home">;

export default function CartScreen() {
  const navigation = useNavigation<CartItemProps>();

  const dispatch = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.cart.cartList
  );

  const subTotal = useAppSelector((state) => state.cart.subTotal);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch, isFocused]);

  const cartItems = response?.data.cart || [];

  const handleDeleteFromCart = async (cart: CartPayload) => {
    await dispatch(deleteFromCartThunk(cart)).then(() => {
      dispatch(getCartThunk());
    });
  };

  return (
    <>
      <ScrollView style={{ flex: 1, paddingVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 5,
            paddingHorizontal: 18,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Cart</Text>
          <View
            style={{
              backgroundColor: "#6B3A2A",
              borderRadius: 50,
              paddingHorizontal: 13,
              paddingVertical: 7,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              {cartItems.length}
            </Text>
          </View>
        </View>

        <FlatList
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          data={cartItems}
          style={{ paddingHorizontal: 18, paddingVertical: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 5 }}>
              <CartItem
                title={item.product.title}
                imageUrl={item.product.images[0]}
                price={item.product.price}
                description={item.product.description}
                onRemove={() => handleDeleteFromCart(item)}
                initialQuantity={item.quantity}
                onQuantityChange={(quantity) =>
                  dispatch(updateSubTotal({ id: item.id, quantity }))
                }
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.product.id?.toString() ?? "",
                    product: item.product,
                  });
                }}
              />
            </View>
          )}
        />
      </ScrollView>

      {/* Total & Checkout */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#F8F8F8",
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            <Text style={{ fontSize: 18, fontWeight: "heavy" }}>Total: </Text>$
            {subTotal}
          </Text>
        </View>
        <CustomButton
          label="Checkout"
          onPress={() =>
            navigation.navigate("Payment", {
              cart: cartItems,
              subTotal: subTotal,
            })
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  listcontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    marginVertical: 5,
  },
  timerText: {
    backgroundColor: "#753742",
    borderRadius: 7,
    color: "#FFFFFF",
    padding: 5,
    fontFamily: "Raleway-Regular",
    marginHorizontal: 2,
  },
  cartContainer: {
    padding: 10,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "white",
  },
  itemsFooterContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "column",
  },
  priceAndCounterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  productDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cartCount: {
    backgroundColor: "#6B3A2A",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
