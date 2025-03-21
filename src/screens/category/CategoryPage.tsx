import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import {
  CategoryPayload,
  getCategoryThunk,
  setSelectedSubCategory,
  SubCategoryPayload,
} from "./slice/CategorySlice";

import { RootStackParamList } from "../../../RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Category">;

export default function Category() {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useAppDispatch();
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const handleToggle = (categoryId: any) => {
    // If the same category is tapped, close it; otherwise, open the tapped category
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };
  const { categoryList, selectedSubCategory } = useAppSelector(
    (state) => state.category
  );
  const { userDetails } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategoryThunk());
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Screen is focused or backed into view");
      // Call your function here
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, [selectedSubCategory, navigation]);

  if (categoryList.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
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
    <ScrollView style={styles.container}>
      {categoryList.success &&
        categoryList.response?.data &&
        categoryList.response.data.categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isOpen={openCategoryId === category.id}
            onToggle={handleToggle}
            onSubToggle={(sub) => {
              if (userDetails?.userRole === "customer") {
                navigation.replace("CategoryProducts", {
                  categoryId: category.id,
                });
              } else {
                dispatch(setSelectedSubCategory(sub));
                console.log(sub);
                navigation.goBack();
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
    <TouchableOpacity onPress={() => onToggle(category.id)}>
      <Text style={styles.header}>{category.name}</Text>
    </TouchableOpacity>
    <Collapsible collapsed={!isOpen}>
      {category.subcategories && category.subcategories.length > 0 ? (
        <View style={styles.subcategories}>
          {category.subcategories.map((sub: any) => (
            <TouchableOpacity key={sub.id} onPress={() => onSubToggle(sub)}>
              <Text style={styles.subcategoryText}>{sub.name}</Text>
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
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subcategories: {
    marginTop: 10,
    paddingLeft: 20,
  },
  subcategoryText: {
    fontSize: 16,
    marginVertical: 3,
  },
});
