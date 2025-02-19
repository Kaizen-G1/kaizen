import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "./src/navigation/BottomNavigation";

import Register from "./src/screens/authentication/register/Register";
import SplashScreen from "./src/screens/authentication/Splash";
import OTPScreen from "./src/screens/authentication/recovery/Otp";
import Login from "./src/screens/authentication/login/login";

import AddProduct from "./src/components/AddOrUpdateProduct";
import FlashShowAll from "./src/components/flash/FlashShowAll";

import { UserRole } from './src/utils/enums';

export type RootStackParamList = {
  Splash: undefined;
  Home: { isVendor: boolean };
  Login: undefined;
  Register: undefined;
  OTP: { email: string };
  AddProduct: { mode: "add" | "update"; initialData?: any };
  FlashShowAll: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {

  const [isVendor, setIsVendor] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        setIsVendor(role === UserRole.COMPANY);
        console.log(role);
        console.log(UserRole.COMPANY);
        console.log(role === UserRole.COMPANY);
        console.log('--------------------');
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

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

        {/* Home Screen with Bottom Navigation */}

        <Stack.Screen
          name="Home"
          options={{ headerShown: false, gestureEnabled: false }}
        >
          {() => <BottomNav isVendor={isVendor} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
