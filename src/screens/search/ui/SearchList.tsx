import React from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";
import { Text, PaperProvider, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../../services/constants";
import { searchListThunk, SearchPayload } from "../slice/SearchSlice";
import ProductItem from "../../../components/ProductItem";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../RootNavigator";
import { useState } from "react";
import FilterModal, { FilterData } from "./FilterModal";
import FilterIcon from "../../../components/FilterIcon";

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchList"
>;

export default function SearchList() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = React.useState<SearchPayload>({});

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterData | null>(null);

  const dispatch = useAppDispatch();
  const { searchList, query } = useAppSelector((state) => state.search);

  React.useEffect(() => {
    setSearchQuery(query);
    dispatch(searchListThunk(query));
  }, [query, dispatch]); // adjust dependency array if needed

  if (searchList.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (searchList.error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {searchList.error}</Text>
      </View>
    );
  }

  const searchResults = searchList.response?.data.products || [];

  const applyFilters = (filterData: FilterData) => {
    setFilters(filterData);

    const updatedQuery = { ...searchQuery, ...filterData };
    setSearchQuery(updatedQuery);

    dispatch(searchListThunk(updatedQuery));

    console.log("Applied Filters:", filterData);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={{ marginBottom: 80 }}>
        <FilterModal
          filterData={filters}
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onApply={applyFilters}
        />
        <View
          style={{
            marginTop: Platform.OS === "ios" ? 50 : 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
            gap: 10,
          }}
        >
          <Searchbar
            style={{
              flex: 1,
              backgroundColor: "#F8F8F8",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.102,
              shadowRadius: 10,
              elevation: 5,
            }}
            placeholder="Search"
            onChangeText={(queryText) => {
              setSearchQuery({ ...searchQuery, query: queryText });
            }}
            value={searchQuery.query ?? ""}
            onSubmitEditing={() => {
              dispatch(searchListThunk(searchQuery));
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <FilterIcon width={40} height={40} />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ paddingVertical: 8 }}
          // ListHeaderComponent={
          //   searchQuery.query && searchResults.length > 0 ? (
          //     <Text
          //       style={{
          //         fontSize: 20,
          //         fontWeight: "bold",
          //         textAlign: "left",
          //         marginBottom: 8,
          //         letterSpacing: 1.5,
          //       }}
          //     >
          //       Search Results found for {searchQuery.query}
          //     </Text>
          //   ) : null
          // }
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 18,
                letterSpacing: 1.5,
              }}
            >
              No results found
            </Text>
          }
          data={searchResults}
          renderItem={({ item }) => (
            <ProductItem
              title={item.title}
              price={item.price.toString()}
              originalPrice={item.costPrice?.toString() || undefined}
              image={item.images[0]}
              discount={item.discount.toString()}
              isDiscounted={item.discount > 0}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  productId: item.id || "",
                  product: item,
                })
              }
            />
          )}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            paddingBottom: 16,
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}
