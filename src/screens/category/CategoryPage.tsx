import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  CategoryPayload,
  setSelectedCategory,
  getCategoryThunk,
} from "../../screens/category/slice/CategorySlice";

const Category = () => {
  const dispatch = useAppDispatch();

  // Get category state from Redux
  const { selectedCategory, categoryList } = useAppSelector(
    (state) => state.category
  );

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(getCategoryThunk());
  }, [dispatch]);

  const handleCategorySelect = (category: CategoryPayload) => {
    dispatch(setSelectedCategory(category));
  };

  // Show loading indicator while fetching
  if (categoryList.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9C7875" />
      </View>
    );
  }

  // Show error if the fetch failed
  if (categoryList.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{categoryList.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {categoryList.response?.data.categories.map(
        (category: CategoryPayload) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.button,
              category.id === selectedCategory.id && styles.selectedButton, // Highlight selected category
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.text}>{category.name}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    width: "40%",
    margin: 10,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#9C7875",
    borderRadius: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#9C7875", // Highlight color for the selected category
    borderColor: "#693B39", // You can change the border color if needed
  },
  text: {
    fontSize: 16,
    color: "#693B39",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default Category;
