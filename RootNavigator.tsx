// navigation/RootNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomBottomNavigation from "./src/navigation/BottomNavigation";
import OTPScreen from "./src/screens/authentication/recovery/Otp";
import Register from "./src/screens/authentication/register/Register";
import SplashScreen from "./src/screens/authentication/Splash";
import Login from "./src/screens/authentication/login/login";
import AddProduct from "./src/components/AddOrUpdateProduct";
import FlashShowAll from "./src/components/flash/FlashShowAll";
import Ionicons from "@expo/vector-icons/Ionicons";

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

const RootNavigator: React.FC = () => {
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

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./src/screens/home/Home";
// import Login from "./src/screens/authentication/login/login";
// import Register from "./src/screens/authentication/register/Register";
// import SplashScreen from "./src/screens/authentication/Splash";
// import BottomNav from "./src/navigation/BottomNavigation";
// import OTPScreen from "./src/screens/authentication/recovery/Otp";
// import AddOrUpdateProduct from "./src/components/AddOrUpdateProduct";

// type RootStackParamList = {
//   Splash: undefined;
//   Home: { userId: string };
//   Login: { userId: string };
//   Register: { userId: string };
//   OTP: { email: string };
//   AddProduct: { userId: string; mode: "add" | "update"; productId?: string };
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const RootNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//           cardStyle: { backgroundColor: "#fff" },
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />

//         <Stack.Screen
//           name="Home"
//           options={{ headerShown: false, gestureEnabled: false }}
//         >
//           {() => <BottomNav isVendor={true} />}
//         </Stack.Screen>

//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="OTP" component={OTPScreen} />
//         <Stack.Screen
//           name="AddProduct"
//           options={{ headerShown: false, gestureEnabled: false }}
//         >
//           {() => <AddOrUpdateProduct mode="add" />}
//         </Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;
