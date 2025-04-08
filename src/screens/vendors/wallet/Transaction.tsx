import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import WalletCard from "./WalletCard";
import { useAppSelector } from "../../../services/constants";

const TransactionScreen = () => {
  const [walletBalance, setWalletBalance] = useState(55000);

   const { orders } = useAppSelector((state) => state.orders);

   const completedTransactions = orders
    .filter((order) => order.status === "Complete")
    .map((order) => ({ 
      id: order.id, 
      type: "Order Payment", 
      amount: order.total_price, 
      date: new Date(order.updated_date).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
      }), 
      updated_date: new Date(order.updated_date), // ✅ Add this for sorting
    }))
    .sort((a, b) => b.updated_date.getTime() - a.updated_date.getTime()); // ✅ Sort DESC by date
    ;

  return (
    <View style={styles.container}>
      <WalletCard />
      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {completedTransactions.length > 0 ? (
      <FlatList
        data={completedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <AntDesign
              name={item.amount > 0 ? "arrowdown" : "arrowup"}
              size={20}
              color={item.amount > 0 ? "green" : "red"}
            />

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionText}>{item.type}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>

            <Text style={styles.transactionAmount}>
              ${item.amount.toLocaleString()}
            </Text>
          </View>
        )}
      />

      ) : (
      <View style={styles.emptyContainer}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No completed transactions available
        </Text>
      </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20 },
  walletCard: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  walletText: { color: "#FFF", fontSize: 14 },
  balance: { color: "#FFF", fontSize: 32, fontWeight: "bold" },
  button: {
    marginTop: 10,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 16 },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  transactionDetails: { flex: 1, marginLeft: 10 },
  transactionText: { fontSize: 16, fontWeight: "bold" },
  transactionDate: { fontSize: 12, color: "gray" },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
  emptyContainer: { marginTop: 20, alignItems: "center" },
});

export default TransactionScreen;
