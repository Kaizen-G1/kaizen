import React from "react";
import RootNavigator from "./RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

import { StyleSheet } from "react-native";

import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "./src/navigation/BottomNavigation";
import AddOrUpdateProduct from "./src/components/AddOrUpdateProduct";

export default function App() {
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={styles.safeArea}> */}
      <SafeAreaProvider>
        <PaperProvider theme={{ colors: { background: "#FFFFFF" } }}>
          <RootNavigator />
        </PaperProvider>
      </SafeAreaProvider>
      {/* </SafeAreaView> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#FFFFFF",
  },
});
