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

export type RootStackParamList = {
  Splash: undefined;
  Home: { isVendor: boolean };
  Login: undefined;
  Register: undefined;
  OTP: { email: string };
  AddProduct: { mode: "add" | "update"; initialData?: any };
  FlashShowAll: undefined;
  OrderDetail: { orderId: string };
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
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{
            headerShown: true,
            title: "",
            headerBackTitle: "Back",
          }}
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
