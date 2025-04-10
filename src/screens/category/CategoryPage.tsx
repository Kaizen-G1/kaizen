import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  CategoryPayload,
  getCategoryThunk,
  setSelectedSubCategory,
  SubCategoryPayload,
} from "./slice/CategorySlice";

import { RootStackParamList } from "../../../RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Category">;

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Category() {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useAppDispatch();
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const handleToggle = (categoryId: any) => {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };
  const { categoryList, selectedSubCategory } = useAppSelector(
    (state) => state.category
  );
  const { userDetails } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategoryThunk());
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [selectedSubCategory, navigation]);

  if (categoryList.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#BC6C25" />
      </View>
    );
  }
  if (categoryList.error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {categoryList.error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
      {categoryList.success &&
        categoryList.response?.data &&
        categoryList.response.data.categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isOpen={openCategoryId === category.id}
            onToggle={handleToggle}
            onSubToggle={(sub) => {
              if (userDetails?.userRole === "company") {
                dispatch(setSelectedSubCategory(sub));
                navigation.goBack();
              } else {
                navigation.navigate("CategoryProducts", {
                  categoryId: category.id,
                  subcategoryId: sub.id,
                });
              }
            }}
          />
        ))}
    </ScrollView>
  );
}

const CategoryItem = ({
  category,
  isOpen,
  onToggle,
  onSubToggle,
}: {
  category: CategoryPayload;
  isOpen: any;
  onToggle: any;
  onSubToggle: (sub: SubCategoryPayload) => void;
}) => (
  <View style={styles.categoryContainer}>
    <TouchableOpacity
      style={styles.headerContainer}
      onPress={() => onToggle(category.id)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: category.demoImages[1] }}
          style={{ width: 60, height: 60, borderRadius: 7 }}
        />
        <Text style={styles.header}>{category.name}</Text>
      </View>
      <Ionicons
        name={isOpen ? "chevron-up" : "chevron-down"}
        size={Platform.OS === "ios" ? 24 : 18}
      />
    </TouchableOpacity>
    <Collapsible collapsed={!isOpen}>
      {category.subcategories && category.subcategories.length > 0 ? (
        <View style={[styles.subcategories, styles.subcategoriesGrid]}>
          {category.subcategories.map((sub: any) => (
            <TouchableOpacity
              key={sub.id}
              style={styles.gridItem}
              onPress={() => onSubToggle(sub)}
            >
              <Text style={styles.subcategoryText}>
                {sub.name.slice(0, 1).toUpperCase() + sub.name.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text>No subcategories found</Text>
      )}
    </Collapsible>
  </View>
);
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  categoryContainer: {
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 7,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.102,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subcategories: {
    marginTop: 10,
  },

  subcategoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  gridItem: {
    width: "50%",
    paddingVertical: 8,
    paddingRight: 10,
  },
  subcategoryText: {
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#753742",
    marginVertical: 3,
    borderColor: "#753742",
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 7,
  },
});
