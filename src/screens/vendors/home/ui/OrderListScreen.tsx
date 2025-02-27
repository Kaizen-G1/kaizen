import React from "react";
import { View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { Text, Chip } from "react-native-paper";
import Header from "../../../../components/vendor/V-header";
import { useOrderViewModel } from "../viewmodel/OrderViewModel";
import OrderItem from "./components/OrderItem";
import { styles } from "./styles";

export default function OrderListScreen() {
  const { orders, loading, error, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter } = useOrderViewModel();

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
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </View>
    </ScrollView>
  );
}
