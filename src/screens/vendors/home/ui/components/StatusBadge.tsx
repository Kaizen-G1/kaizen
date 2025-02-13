import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getStatusStyle } from "../styles";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyle = getStatusStyle(status);

  return (
    <View style={[styles.badge, { backgroundColor: statusStyle.backgroundColor }]}>
      <Text style={[styles.badgeText, { color: statusStyle.textColor }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
