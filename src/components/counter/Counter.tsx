import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const Counter = () => {
  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <IconButton 
        icon="minus" 
        size={16} 
        onPress={() => setCount(count - 1)} 
        style={styles.button}
        iconColor="#693B3B"
        disabled={count === 1}
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
      </View>
      <IconButton 
        icon="plus" 
        size={16} 
        onPress={() => setCount(count + 1)} 
        style={styles.button}
        iconColor="#693B3B"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "#693B3B",
    borderRadius: 50,
    backgroundColor: "white",
  },
  counterContainer: {
    backgroundColor: "#693B3B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  counterText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Counter;
