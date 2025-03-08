import React, { useEffect } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  CartPayload,
  deleteFromCartThunk,
  getCartThunk,
  updateSubTotal,
} from "./slice/CartSlice";
import CartItem from "../../components/CartItem";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

type CartItemProps = StackNavigationProp<RootStackParamList, "Home">;

export default function CartScreen() {
  const navigation = useNavigation<CartItemProps>();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { response } = useAppSelector((state) => state.cart.cartList);
  const subTotal = useAppSelector((state) => state.cart.subTotal);
  const cartItems = response?.data.cart || [];

  useEffect(() => {
    if (isFocused) {
      dispatch(getCartThunk());
    }
  }, [isFocused]);

  const handleDeleteFromCart = async (cart: CartPayload) => {
    await dispatch(deleteFromCartThunk(cart));
    dispatch(getCartThunk());
  };

  return (
    <>
      <ScrollView style={{ flex: 1, paddingVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#F8F8F8",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          <Text style={{ fontSize: 18, fontWeight: "heavy" }}>Total: </Text>$
          {subTotal.toFixed(2)}
        </Text>
        <CustomButton
          label="Checkout"
          onPress={() =>
            navigation.navigate("Payment", { cart: cartItems, subTotal })
          }
        />
      </View>
    </>
  );
}
