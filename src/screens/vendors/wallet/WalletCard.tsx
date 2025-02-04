import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const { width } = Dimensions.get("window");

const WalletCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="sim-card" size={36} color="#FFD700" />
        <MaterialIcons name="wifi" size={24} color="#fff" />
      </View>

      <Text style={styles.balanceLabel}>Your Wallet Balance</Text>
      <Text style={styles.cardNumber}>$55,000</Text>

      <View style={styles.footer}>
        <Button
          mode="contained"
          buttonColor="#fff"
          labelStyle={{
            color: "#000",
            fontWeight: "semibold",
            fontSize: 17,
            letterSpacing: 2,
          }}
          style={{ borderRadius: 5 }}
          onPress={() => console.log("Withdraw")}
          accessibilityLabel="Withdraw balance"
        >
          Withdraw
        </Button>
        <View>
          <Text style={styles.label}>VALID THRU</Text>
          <Text style={styles.date}>12/28</Text>
        </View>
      </View>

      <View style={styles.hologram}>
        <View style={styles.hologramOverlay} />
      </View>
    </View>
  );
};

const CARD_WIDTH = width - 40;
const CARD_HEIGHT = 220;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: "#2a2a2a",
    padding: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  balanceLabel: {
    color: "#fff",
    letterSpacing: 3,
    fontFamily: "Courier",
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  cardNumber: {
    color: "white",
    fontSize: 20,
    letterSpacing: 3,
    fontFamily: "Courier",
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "left",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    marginBottom: 4,
  },
  date: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  hologram: {
    position: "absolute",
    right: 30,
    top: 20,
    width: 50,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    transform: [{ skewX: "-20deg" }],
    borderRadius: 4,
  },
  hologramOverlay: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    transform: [{ skewX: "20deg" }],
  },
});

export default WalletCard;
