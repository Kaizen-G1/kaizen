import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import CategoryCard from "kaizen-components/components/CategoryCard/CategoryCard";
import CustomIcon from "kaizen-components/components/CustomIcon/CustomIcon";
import { CategoryPayload } from "../screens/category/slice/CategorySlice";

type CategoryListProps = {
  title: string;
  categories: CategoryPayload[];
  onSelectCategory: (id: string) => void;
  onSeeAll: () => void;
  maxVisibleCategories?: number;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const CategoryList: React.FC<CategoryListProps> = ({
  title,
  categories,
  onSelectCategory,
  onSeeAll,
  maxVisibleCategories = 4,
}) => {
  const visibleCategories = categories.slice(0, maxVisibleCategories);

  return (
    <View style={styles.container}>
      {/* title section */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {categories.length > maxVisibleCategories && (
          <TouchableOpacity onPress={onSeeAll} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See All</Text>
            <CustomIcon icon="arrow-right" type="circle" />
          </TouchableOpacity>
        )}
      </View>
      {/* list section */}
      <View style={styles.grid}>
        {visibleCategories.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <CategoryCard
              title={item.name}
              count={item.count}
              images={item.demoImages}
              onPress={() => onSelectCategory(item.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  cardContainer: {
    marginBottom: 5,
    width: SCREEN_WIDTH / 2 - 24,
  },
});

export default CategoryList;
