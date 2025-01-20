import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

interface DiscountBadgeProps {
  discountPercentage: string;
}

const DiscountBadge = ({ discountPercentage }: DiscountBadgeProps) => {
  return (
    <LinearGradient
      colors={["#FF5790", "#F81140"]}
      style={styles.discountBadge}
      start={[1, 1]}
      end={[0, 0]}
    >
      <Text style={styles.discountText}>-{discountPercentage}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  discountBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  discountText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default DiscountBadge;
