import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Card } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";
import FlashSaleHeader from "../FlashSaleHeader";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../RootNavigator";

const { width } = Dimensions.get("screen");

type FlashSaleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FlashShowAll"
>;

const DUMMY_DATA = [
  { id: "1", image: require("../../../assets/two.jpg") },
  { id: "2", image: require("../../../assets/junko.jpg") },
  { id: "3", image: require("../../../assets/five.jpeg") },
  { id: "4", image: require("../../../assets/five.jpeg") },
  { id: "5", image: require("../../../assets/two.jpg") },
  { id: "6", image: require("../../../assets/junko.jpg") },
];

export default function FlashSaleScreen() {
  const navigation = useNavigation<FlashSaleScreenNavigationProp>();

  const [timeLeft, setTimeLeft] = useState(3600);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("Timer reached 0");
      setIsTimerActive(false);
      return;
    }

    if (isTimerActive) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, isTimerActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

    return { hours, minutes, remainingSeconds };
  };

  const { hours, minutes, remainingSeconds } = formatTime(timeLeft);

  return (
    <View style={styles.container}>
      <FlashSaleHeader
        hours={hours}
        minutes={minutes}
        remainingSeconds={remainingSeconds}
      />
      <TouchableOpacity onPress={() => navigation.navigate("FlashShowAll")}>
        <FlatList
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
          data={DUMMY_DATA}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <Card style={styles.itemContainer}>
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.itemImage} />
              </View>

              <LinearGradient
                colors={["#FF5790", "#F81140"]}
                style={styles.discountBadge}
                start={[1, 1]} // Start the gradient at the left (0%)
                end={[0, 0]} // End the gradient at the right (100%)
              >
                <Text style={styles.discountText}>-20%</Text>
              </LinearGradient>
            </Card>
          )}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
    // opacity: 0.75,
    fontWeight: "bold",
    borderRadius: 7,
    color: "#FFFFFF",
    padding: 5,
    fontFamily: "Raleway-Regular",
    marginHorizontal: 2,
  },
  timerSeparator: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    width: (width - 48) / 3,
    marginBottom: 6,
    marginRight: 4,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    // Drop shadow properties
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    elevation: 10,
  },
  imageWrapper: {
    padding: 5,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 110,
    resizeMode: "cover",
    borderRadius: 9,
  },

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
  columnWrapper: {
    justifyContent: "space-between",
  },
});
