import React from "react";
import RootNavigator from "./RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

import { StyleSheet } from "react-native";

import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={{ colors: { background: "#FFFFFF" } }}>
          <SafeAreaView style={styles.safeArea}>
            <RootNavigator />
          </SafeAreaView>
        </PaperProvider>
      </SafeAreaProvider>
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
