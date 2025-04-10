import React from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CategoryPayload } from "../../category/slice/CategorySlice";
import CustomIcon from "kaizen-components/components/CustomIcon/CustomIcon";

type CateogoryComponentProps = {
  data: CategoryPayload[];
  onSelectCategory: (id: string) => void;
  onSeeAll: () => void;
};

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardMargin = 10;
const cardSize = (screenWidth - (numColumns + 1) * cardMargin) / numColumns;
const subImageSize = (cardSize - cardMargin) / 2;

const CateogoryComponent: React.FC<CateogoryComponentProps> = ({
  data,
  onSelectCategory,
  onSeeAll,
}) => {
  const renderItem = ({ item }: { item: CategoryPayload }) => (
    <TouchableOpacity onPress={() => onSelectCategory(item.id)}>
      <View style={styles.card}>
        <View style={styles.imageGrid}>
          {item.demoImages.slice(0, 4).map((uri, index) => (
            <Image
              key={index.toString()}
              source={{ uri }}
              style={styles.subImage}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.categoryName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.count}>{item.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllContainer}>
          <Text style={styles.seeAllText}>See All</Text>
          <CustomIcon icon="arrow-right" type="circle" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    padding: cardMargin,
    backgroundColor: "white",
  },
  card: {
    width: cardSize,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    elevation: 5,
    margin: cardMargin / 2,
    padding: 2,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 2,
    justifyContent: "space-between",
  },
  subImage: {
    width: subImageSize,
    height: subImageSize,
    marginBottom: cardMargin / 2,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  categoryName: {
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.15,
    width: "70%",
    maxHeight: 40,
    lineHeight: 20,
  },
  count: {
    backgroundColor: "#753742",
    opacity: 0.75,
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: "#fff",
    textAlign: "center",
  },
});

export default CateogoryComponent;
