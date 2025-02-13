import React, { useState } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import Header from "../../../components/vendor/V-header";

interface Order {
  id: string;
  name: string;
  orderId: string;
  date: string;
  status:
    | "New Order"
    | "Awaiting Pickup"
    | "In transit"
    | "Complete"
    | "Cancelled";
}

const orders: Order[] = [
  {
    id: "1",
    name: "Raiden Lord",
    orderId: "#212323",
    date: "Today | 9:00 am",
    status: "New Order",
  },
  {
    id: "2",
    name: "Nike Shoe",
    orderId: "#212323",
    date: "Today | 9:00 am",
    status: "Awaiting Pickup",
  },
  {
    id: "3",
    name: "Watch",
    orderId: "#212323",
    date: "Today | 9:00 am",
    status: "In transit",
  },
  {
    id: "4",
    name: "Jacket",
    orderId: "#212323",
    date: "25th November, 2023 | 9:00 am",
    status: "Complete",
  },
  {
    id: "5",
    name: "Raiden Lord",
    orderId: "#212323",
    date: "25th November, 2023 | 9:00 am",
    status: "Cancelled",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "New Order":
      return { backgroundColor: "#315731", icon: "bell-alert" };
    case "Awaiting Pickup":
      return {
        backgroundColor: "#BC6C25",
        opacity: 0.8,
        icon: "package-variant-closed",
      };
    case "In transit":
      return {
        backgroundColor: "#0754E4",
        icon: "truck-delivery",
      };
    case "Complete":
      return {
        backgroundColor: "#EAFFEA",
        icon: "check-circle",
        textcolor: "#324E33",
      };
    case "Cancelled":
      return { backgroundColor: "#9B2C2D", icon: "close-circle" };
    default:
      return { backgroundColor: "#000", icon: "alert" };
  }
};

export default function OrderListScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          notificationCount={2}
          onNotificationPress={() => {
            console.log("Notification pressed");
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
              "New Order",
              "Awaiting Pickup",
              "In transit",
              "Complete",
            ].map((filter, index) => (
              <Chip
                key={index}
                mode={selectedFilter === filter ? "flat" : "outlined"} // Change mode based on selection
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      selectedFilter === filter ? "#753742" : "transparent", // Set background color
                    borderColor: "#753742",
                  },
                ]}
                textStyle={{
                  color: selectedFilter === filter ? "#FFF" : "black", // Text color based on selection
                }}
                onPress={() => setSelectedFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredOrders}
          scrollEnabled={false}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const statusStyle = getStatusStyle(item.status);
            return (
              <View style={styles.orderItem}>
                <View>
                  <Text variant="titleSmall">{item.name}</Text>
                  <Text variant="bodySmall">Order ID {item.orderId}</Text>
                  <Text variant="bodySmall">{item.date}</Text>
                </View>
                <Button
                  mode="contained"
                  style={[
                    styles.statusButton,
                    {
                      backgroundColor: statusStyle.backgroundColor,
                      opacity: statusStyle.opacity,
                    },
                  ]}
                  labelStyle={{
                    color: statusStyle.textcolor ?? "#FFF",
                    fontSize: 14,
                  }}
                  // icon={() => (
                  //   <Icon
                  //     name={statusStyle.icon}
                  //     size={16}
                  //     color="#FFF"
                  //   />
                  // )}
                >
                  {item.status}
                </Button>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 7.9,
    marginHorizontal: 20,
  },
  textInput: {
    color: "black", // Set the default text color to black
  },
  filterContainer: {
    height: 50, // Fixed height for the filter container
    marginBottom: 16,
  },
  scrollViewContent: {
    alignItems: "center", // Center chips vertically withcogs-outlinein the ScrollView
    paddingHorizontal: 20,
  },
  chip: {
    marginRight: 8,
    height: 35, // Fixed height for chips
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    paddingHorizontal: 12, // Consistent horizontal padding
    minWidth: 80, // Minimum width to ensure chips don't get too small
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  statusButton: {
    borderRadius: 4,
  },
});
