import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import AddIcon from "../AddIcon";

const Counter = ({
  quantity = 1, // Default quantity
  onChangeQuantity,
  isWish = false,
  onWishPress,
}: {
  quantity?: number;
  onChangeQuantity?: (count: number) => void;
  isWish?: boolean;
  onWishPress?: () => void;
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Sync internal state when quantity changes externally
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleIncrement = () => {
    const current = parseInt(inputValue, 10) || 1;
    if (current < 100) {
      const newCount = current + 1;
      setInputValue(newCount.toString());
      onChangeQuantity?.(newCount);
    }
  };

  const handleDecrement = () => {
    const current = parseInt(inputValue, 10) || 1;
    if (current > 1) {
      const newCount = current - 1;
      setInputValue(newCount.toString());
      onChangeQuantity?.(newCount);
    }
  };

  const handleTextChange = (text: string) => {
    if (text === "") {
      setInputValue("");
      return;
    }

    const parsed = parseInt(text, 10);

    if (!isNaN(parsed)) {
      if (parsed > 100) {
        setInputValue("100");
        onChangeQuantity?.(100);
      } else if (parsed >= 1) {
        setInputValue(text);
        onChangeQuantity?.(parsed);
      } else {
        setInputValue("1");
        onChangeQuantity?.(1);
      }
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10);
    if (inputValue === "" || isNaN(parsed) || parsed < 1) {
      setInputValue("1");
      onChangeQuantity?.(1);
    } else if (parsed > 100) {
      setInputValue("100");
      onChangeQuantity?.(100);
    }
  };

  return (
    <>
      {isWish ? (
        <TouchableOpacity onPress={onWishPress}>
          <AddIcon />
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <IconButton
            icon="minus"
            size={16}
            onPress={handleDecrement}
            style={styles.button}
            iconColor="#693B3B"
            disabled={(parseInt(inputValue, 10) || 1) <= 1}
          />
          <TextInput
            style={styles.counterInput}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={handleTextChange}
            onBlur={handleBlur}
          />
          <IconButton
            icon="plus"
            size={16}
            onPress={handleIncrement}
            style={styles.button}
            iconColor="#693B3B"
          />
        </View>
      )}
    </>
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
  counterInput: {
    backgroundColor: "#693B3B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 2,
    color: "white",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.16,
    textAlign: "center",
  },
});

export default Counter;
