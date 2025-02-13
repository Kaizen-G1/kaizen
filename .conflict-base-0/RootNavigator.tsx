import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/home/Home";
import Login from "./src/screens/authentication/login/login";
import Register from "./src/screens/authentication/register/Register";
import SplashScreen from "./src/screens/authentication/Splash";
import BottomNav from "./src/navigation/BottomNavigation";
import OTPScreen from "./src/screens/authentication/recovery/Otp";

type RootStackParamList = {
  Splash: undefined;
  Home: { userId: string };
  Login: { userId: string };
  Register: { userId: string };
  OTP: { email: string };
  // Add more screen names and types as needed
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen
          name="Home"
          options={{ headerShown: false, gestureEnabled: false }}
        >
          {() => <BottomNav isVendor={true} />}
        </Stack.Screen>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OTP" component={OTPScreen} />

        {/* Add more screen names and components as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
