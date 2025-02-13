import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Fontisto from "@expo/vector-icons/Fontisto";

interface FlashSaleHeaderProps {
  hours: string;
  minutes: string;
  remainingSeconds: string;
}

const FlashSaleHeader: React.FC<FlashSaleHeaderProps> = ({
  hours,
  minutes,
  remainingSeconds,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Flash Sale</Text>
      <View style={styles.timerContainer}>
        <Fontisto
          name="stopwatch"
          size={24}
          color="#000000"
          style={{ paddingRight: 10.4 }}
        />
        <Text style={[styles.timerText]}>{hours}</Text>
        <Text style={[styles.timerText]}>{minutes}</Text>
        <Text style={[styles.timerText]}>{remainingSeconds}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: -0.21,
    fontFamily: "Raleway-Regular",
    textAlign: "left",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    backgroundColor: "#753742",
    fontWeight: "bold",
    borderRadius: 7,
    color: "#FFFFFF",
    padding: 5,
    fontFamily: "Raleway-Regular",
    marginHorizontal: 2,
  },
});

export default FlashSaleHeader;
