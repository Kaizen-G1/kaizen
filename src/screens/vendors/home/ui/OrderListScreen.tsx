import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, Chip } from "react-native-paper";
import Header from "../../../../components/vendor/V-header";
import { useOrderViewModel } from "../viewmodel/OrderViewModel";
import OrderItem from "./components/OrderItem";
import { styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../RootNavigator";
import { useAppDispatch, useAppSelector } from "../../../../services/constants";
import { fetchOrders } from "../slice/OrderSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "mongoose";
import { getNotificationsThunk } from "../../../notifcations/slice/NotificatiosSlice";

type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function OrderListScreen() {
  
  const [customerName, setCustomerName] = useState("");
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {
    orders,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
  } = useOrderViewModel();

  const { response } = useAppSelector(
    (state) => state.notifications.notifications
  );

  const totalNotifications = response?.data.notifications.length;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrders());
    }, [dispatch])
  );

  useEffect(() => {
      const fetchCustomerName = async () => {
        const name = await AsyncStorage.getItem("customerName");
        setCustomerName(name || "Hello, User!");
      };
      fetchCustomerName();
    }, []);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#753742"
        style={{ marginTop: 20 }}
      />
    );
  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          title={customerName}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          notificationCount={totalNotifications}
          onNotificationPress={() => {
            navigation.navigate("Notifications");
          }}
        />
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {[
              "All",
              "Pending",
              "Awaiting Pickup",
              "In transit",
              "Complete",
              "Cancelled",
            ].map((filter) => (
              <Chip
                key={filter}
                mode={selectedFilter === filter ? "flat" : "outlined"}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      selectedFilter === filter ? "#753742" : "transparent",
                  },
                ]}
                textStyle={{
                  color: selectedFilter === filter ? "#FFF" : "black",
                }}
                onPress={() => setSelectedFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </ScrollView>
        </View>
        {Array.isArray(orders) && orders.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={orders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderDetail", { orderId: item.id })
                }
              >
                <OrderItem order={item} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No orders available
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
