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

const transactions = [
  {
    id: "1",
    type: "Order Payment",
    amount: 50000,
    date: "November 25th, 2023",
  },
  {
    id: "2",
    type: "Order Payment",
    amount: 50000,
    date: "November 25th, 2023",
  },
  { id: "3", type: "Withdrawal", amount: -200000, date: "November 25th, 2023" },
  {
    id: "4",
    type: "Order Payment",
    amount: 50000,
    date: "November 25th, 2023",
  },
  { id: "5", type: "Withdrawal", amount: -20000, date: "November 25th, 2023" },
  {
    id: "6",
    type: "Order Payment",
    amount: 170000,
    date: "November 25th, 2023",
  },
];

const TransactionScreen = () => {
  const [walletBalance, setWalletBalance] = useState(55000);

  return (
    <View style={styles.container}>
      <WalletCard />
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
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
              {item.amount.toLocaleString()}
            </Text>
          </View>
        )}
      />
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
});

export default TransactionScreen;
