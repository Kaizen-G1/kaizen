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
import AllProductPage from "./src/screens/product/AllProduct";
import ProductDetailsPage from "./src/screens/product/ProductDetails";
import { ProductPayload } from "./src/screens/vendors/product/slice/ProductSlice";
import Category from "./src/screens/category/CategoryPage";
import PaymentScreen from "./src/screens/payment/Payment";
import { CartPayload } from "./src/screens/cart/slice/CartSlice";

export type RootStackParamList = {
  Splash: undefined;
  Home: { isVendor: boolean };
  Login: undefined;
  Register: undefined;
  OTP: { email: string };
  AddProduct: { mode: "add" | "update"; initialData?: any };
  FlashShowAll: undefined;
  AllProduct: undefined;
  ProductDetails: { productId: string; product: ProductPayload };
  Category: undefined;
  Payment: {
    cart: CartPayload[];
    subTotal: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "#000",
            lineHeight: 20,
            letterSpacing: 2,
          },
          animation: "scale_from_center",
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
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerShown: true,
            title: "",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="AllProduct"
          component={AllProductPage}
          options={{
            headerShown: true,
            title: "New Products",

            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsPage}
          options={{
            headerShown: true,
            title: "Product Details",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerShown: true,
            title: "",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: true, headerBackTitle: "Back" }}
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
