import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  getNotificationsThunk,
  markAsReadThunk,
  NotificationPayload,
} from "./slice/NotificatiosSlice";
import { ActivityIndicator, Text } from "react-native-paper";
import NotifyCard from "../../components/notification/notifyCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";

type NotificationNavProp = StackNavigationProp<
  RootStackParamList,
  "Notifications"
>;

export default function Notifications() {
  const navigation = useNavigation<NotificationNavProp>();
  const dispach = useAppDispatch();

  const { loading, error, success, response } = useAppSelector(
    (state) => state.notifications.notifications
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispach(getNotificationsThunk());
    }
  }, [dispach, isFocused]);

  const notificationList =
    (response && response.data && response.data.notifications) || [];

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList<NotificationPayload>
        data={notificationList}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No Notifications</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
            <NotifyCard
              key={item.id}
              title={item.title}
              message={item.message}
              isRead={item.isRead}
              time={item.createdDate}
              onPress={async () => {
                await dispach(markAsReadThunk(item)).then(() => {
                  dispach(getNotificationsThunk());
                });
                const data = item.data;
                if (data && data.product.id) {
                  const product = data.product;
                  navigation.replace("ProductDetails", {
                    productId: product.id ?? "",
                    product: product,
                  });
                }
              }}
            />
          </View>
        )}
      />
    </>
  );
}
