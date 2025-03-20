import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomBottomNavigation from "./src/navigation/BottomNavigation";
import Register from "./src/screens/authentication/register/Register";
import SplashScreen from "./src/screens/authentication/Splash";
import OTPScreen from "./src/screens/authentication/recovery/Otp";
import Login from "./src/screens/authentication/login/login";
import AddProduct from "./src/components/AddOrUpdateProduct";
import FlashShowAll from "./src/components/flash/FlashShowAll";
import OrderDetailScreen from "./src/screens/vendors/home/ui/OrderDetailScreen";
import AllProductPage from "./src/screens/product/AllProduct";
import ProductDetailsPage from "./src/screens/product/ProductDetails";
import { ProductPayload } from "./src/screens/vendors/product/slice/ProductSlice";
import Category from "./src/screens/category/CategoryPage";
import AddOrUpdateVendorDetail from "./src/screens/vendors/vendordetails/AddOrUpdateVendorDetail";
import PaymentScreen from "./src/screens/payment/Payment";
import { CartPayload } from "./src/screens/cart/slice/CartSlice";

import { Icon, Text } from "react-native-paper";
import { Dimensions, Platform, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import StripePaymentScreen from "./src/screens/payment/StriveProvider";
import CategoryProducts from "./src/screens/product/CategoryProducts";

import Notifications from "./src/screens/notifcations/notifications";
import CustomerOrderList from './src/screens/profile/CustomerOrderListScreen';
import ProductReview from "./src/screens/productReview/ProductReviewScreen";
import { Product } from './src/screens/vendors/home/data/OrderTypes';

export type RootStackParamList = {
  Splash: undefined;
  Home: { isVendor: boolean };
  Login: undefined;
  Register: undefined;
  OTP: { email: string };
  AddProduct: { mode: "add" | "update"; initialData?: any };
  FlashShowAll: undefined;
  OrderDetail: { orderId: string };
  AllProduct: undefined;
  ProductDetails: { productId: string; product: ProductPayload };
  Category: undefined;
  AddOrUpdateVendor: { mode: "add" | "update"; initialData?: any };
  Payment: {
    cart: CartPayload[];
    subTotal: number;
  };
  StripePayment: {
    total: number;
  };
  CategoryProducts: { categoryId: string };
  CustomerOrderList: { type: "pay" | "receive" | "review"; orders: any[] };
  ProductReview: { productId: "" };
  Notifications: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const SCREEN_WIDTH = Dimensions.get("screen").height;

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerTransparent: false,
          headerTitleAlign: "center",
          headerBackTitle: "",
          headerBackImage: () => (
            <>
              <View
                style={{
                  // flex: 1,
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderRadius: 50,
                  alignItems: "center",
                  gap: 2,
                  marginLeft: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                }}
              >
                <Ionicons
                  name={"chevron-back"}
                  size={Platform.OS === "ios" ? 24 : 18}
                />
                <Text
                  style={{
                    fontSize: Platform.OS === "ios" ? 18 : 14,
                    fontWeight: "700",
                    letterSpacing: 1.5,
                  }}
                >
                  Back
                </Text>
              </View>
            </>
          ),
          headerStyle: {
            backgroundColor: "#BC6C25",
            height:
              Platform.OS === "ios" ? SCREEN_WIDTH * 0.14 : SCREEN_WIDTH * 0.12,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: Platform.OS === "ios" ? 24 : 20,
            color: "#fff",
            letterSpacing: 2,
          },

          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen
          name="FlashShowAll"
          component={FlashShowAll}
          options={{
            headerShown: true,
            title: "",
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerShown: true,
            title: "",
          }}
        />

        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />

        <Stack.Screen
          name="AllProduct"
          component={AllProductPage}
          options={{
            headerShown: true,
            title: "New Products",
          }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsPage}
          options={{
            headerShown: true,
            title: "Product Details",
          }}
        />

        <Stack.Screen
          name="CategoryProducts"
          component={CategoryProducts}
          options={{
            headerShown: true,
            title: "Product Details",
          }}
        />
        
        <Stack.Screen
          name="CustomerOrderList"
          component={CustomerOrderList}
          options={{
            headerShown: true,
            title: "Orders",
          }}
        />
        
        <Stack.Screen
          name="ProductReview"
          component={ProductReview}
          options={{
            headerShown: true,
            title: "Reivews",
          }}
        />

        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerShown: true,
            title: "Category",
          }}
        />

        <Stack.Screen
          name="AddOrUpdateVendor"
          component={AddOrUpdateVendorDetail}
          options={{
            headerShown: true,
            title: "",
          }}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="StripePayment"
          component={StripePaymentScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: true }}
        />

        {/* Home Screen with Bottom Navigation */}
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ route }) => (
            <CustomBottomNavigation
              isVendor={route.params?.isVendor ?? false}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
