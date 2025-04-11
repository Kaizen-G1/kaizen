import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";

type TopProductsProps = {
  title: string;
  items: { id: string; image: string }[];
  onPress: (label: string) => void;
};

const TopProducts: React.FC<TopProductsProps> = ({ title, items, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      ></ScrollView>
    </View>
  );
};

const CIRCLE_SIZE = Math.min(Dimensions.get("window").width / 7.5, 100);
const BORDER_WIDTH = 5;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  circle: {
    marginHorizontal: CIRCLE_SIZE / 10,
    height: CIRCLE_SIZE + 20,
  },
  outerCircle: {
    width: CIRCLE_SIZE + BORDER_WIDTH * 2,
    height: CIRCLE_SIZE + BORDER_WIDTH * 2,
    borderRadius: (CIRCLE_SIZE + BORDER_WIDTH * 2) / 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  innerCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default TopProducts;
