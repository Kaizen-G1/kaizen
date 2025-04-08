import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CustomButton from "kaizen-components/components/CustomButton/CustomButton";

export interface FilterData {
  minPrice: number;
  maxPrice: number;
  sortBy: "discount" | "price" | "count";
  limit: number;
  page: number;
}

interface FilterModalProps {
  isVisible: boolean;
  filterData: FilterData | null;
  onClose: () => void;
  onApply: (filterData: FilterData) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  filterData,
  onClose,
  onApply,
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<"discount" | "price" | "count">("price");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  React.useEffect(() => {
    if (filterData) {
      setMinPrice(filterData.minPrice);
      setMaxPrice(filterData.maxPrice);
      setSortBy(filterData.sortBy);
      setLimit(filterData.limit);
      setPage(filterData.page);
    }
  }, [filterData]);

  // Maintain slider state
  const [sliderValues, setSliderValues] = useState<number[]>([
    minPrice,
    maxPrice,
  ]);

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const applyFilters = () => {
    onApply({
      minPrice,
      maxPrice,
      sortBy,
      limit,
      page,
    });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Filter Products</Text>

        <Text style={styles.label}>
          Price Range: {minPrice} - {maxPrice}
        </Text>
        <MultiSlider
          values={sliderValues}
          sliderLength={280}
          onValuesChange={handleSliderChange}
          min={0}
          max={5000}
          step={10}
        />

        <Text style={styles.label}>Sort By:</Text>
        <View style={styles.sortContainer}>
          {(["discount", "price", "count"] as const).map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setSortBy(option)}
              style={[
                styles.sortButton,
                sortBy === option && styles.selectedSortButton,
              ]}
            >
              <Text style={styles.sortText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Limit"
          keyboardType="numeric"
          value={limit.toString()}
          onChangeText={(text) => setLimit(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Page"
          keyboardType="numeric"
          value={page.toString()}
          onChangeText={(text) => setPage(Number(text))}
        />

        <View>
          <CustomButton label="Apply Filters" onPress={applyFilters} />
          <CustomButton
            type="secondary"
            label="Reset Filters"
            onPress={() => {
              setMinPrice(0);
              setMaxPrice(1000);
              setSortBy("price");
              setLimit(10);
              setPage(1);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
  },
  sortContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  sortButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  selectedSortButton: {
    backgroundColor: "#ddd",
  },
  sortText: {
    textTransform: "capitalize",
  },
});

export default FilterModal;
