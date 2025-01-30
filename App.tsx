import React from "react";
import RootNavigator from "./RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
