import React, { useEffect } from "react";
import { View, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Text, Chip } from "react-native-paper";
import Header from "../../../../components/vendor/V-header";
import { useOrderViewModel } from "../viewmodel/OrderViewModel";
import OrderItem from "./components/OrderItem";
import { styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../RootNavigator";
import { useAppDispatch } from "../../../../services/constants";
import { fetchOrders } from "../slice/OrderSlice";

type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function OrderListScreen() {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { orders, loading, error, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter } = useOrderViewModel();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrders());
    }, [dispatch])
  );

  if (loading) return <ActivityIndicator size="large" color="#753742" style={{ marginTop: 20 }} />;
  if (error) return <View style={styles.errorContainer}><Text style={{ color: "red" }}>{error}</Text></View>;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header searchQuery={searchQuery} onSearch={setSearchQuery} />
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {["All", "Pending", "Awaiting Pickup", "In transit", "Complete", "Cancelled"].map((filter) => (
              <Chip
                key={filter}
                mode={selectedFilter === filter ? "flat" : "outlined"}
                style={[
                  styles.chip,
                  { backgroundColor: selectedFilter === filter ? "#753742" : "transparent" },
                ]}
                textStyle={{ color: selectedFilter === filter ? "#FFF" : "black" }}
                onPress={() => setSelectedFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate("OrderDetail", { orderId: item.id })}>
              <OrderItem order={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}
