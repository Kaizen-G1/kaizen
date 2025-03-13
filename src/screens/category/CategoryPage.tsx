import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  getCategoriesWithSubcategoriesThunk,
  CategoryWithSubCategoriesPayload,
  setSelectedSubCategory,
} from "../../screens/category/slice/CategorySlice";

const Category = () => {
  const dispatch = useAppDispatch();

  // Get category state from Redux
  const { selectedCategory, categoryWithSubCategoriesList } = useAppSelector(
    (state) => state.category
  );

  // Local states
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null); // Save subcategory ID

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(getCategoriesWithSubcategoriesThunk());
  }, [dispatch]);

  // Handle category selection
  const handleCategorySelect = (subcategory: CategoryWithSubCategoriesPayload) => {
    dispatch(setSelectedSubCategory(subcategory));

    // Toggle expansion of the category
    setExpandedCategoryId((prevId) => (prevId === subcategory.id ? null : subcategory.id));
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory: { id: string; name: string }) => {
    setSelectedSubCategoryId(subCategory.id); // Save subcategory ID
    dispatch(setSelectedSubCategory(subCategory)); // Dispatch Redux action if needed
  };

  console.log("Selected Subcategory ID:", selectedSubCategoryId);

  // Show loading indicator while fetching
  if (categoryWithSubCategoriesList.loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading categories...</Text>
        <ActivityIndicator size="large" color="#9C7875" />
      </View>
    );
  }

  // Show error if the fetch failed
  if (categoryWithSubCategoriesList.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{categoryWithSubCategoriesList.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {categoryWithSubCategoriesList.response?.data.categories.map(
        (category: CategoryWithSubCategoriesPayload) => (
          <View key={category.id} style={styles.categoryContainer}>
            {/* Category Button */}
            <TouchableOpacity
              style={[
                styles.button,
                category.id === selectedCategory?.id && styles.selectedButton, // Highlight selected category
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.text}>{category.name}</Text>
            </TouchableOpacity>

            {/* Show Subcategories if Expanded */}
            {expandedCategoryId === category.id && category.subcategories && (
              <View style={styles.subcategoryContainer}>
                {category.subcategories.map((sub) => (
                  <TouchableOpacity
                    key={sub.id}
                    style={[
                      styles.subcategoryButton,
                      sub.id === selectedSubCategoryId && styles.selectedSubcategoryButton, // Highlight selected subcategory
                    ]}
                    onPress={() => handleSubCategorySelect(sub)}
                  >
                    <Text style={styles.subcategoryText}>{sub.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#9C7875",
    borderRadius: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#f7ebeb", // Highlight color for the selected category
    borderColor: "#693B39",
  },
  text: {
    fontSize: 16,
    color: "#693B39",
    fontWeight: "bold",
  },
  subcategoryContainer: {
    marginTop: 5,
    paddingLeft: 20,
  },
  subcategoryButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#9C7875",
  },
  selectedSubcategoryButton: {
    backgroundColor: "#f7ebeb", // Highlight color for the selected subcategory
  },
  subcategoryText: {
    fontSize: 14,
    color: "#693B39",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#9C7875",
    marginBottom: 10,
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
