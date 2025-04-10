import React from "react";
import RootNavigator from "./RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

export default function App(props) {
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={styles.safeArea}> */}
      <SafeAreaProvider>
        <PaperProvider theme={{ colors: { background: "#FFFFFF" } }}>
          <ToastManager position="bottom" />

          <RootNavigator />
          <ToastManager />
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
