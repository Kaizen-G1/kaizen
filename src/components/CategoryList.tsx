import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';

import CategoryCard from 'tenzai-components/components/CategoryCard';

type CategoryListProps = {
  title: string;
  categories: {
    id: number;
    title: string;
    count: number;
    images: string[];
  }[];
  onSelectCategory: (id: number) => void;
  onSeeAll: () => void;
  maxVisibleCategories?: number;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const CategoryList: React.FC<CategoryListProps> = ({
  title,
  categories,
  onSelectCategory,
  onSeeAll,
  maxVisibleCategories = 4 }) => {
  const visibleCategories = categories.slice(0, maxVisibleCategories);

  return (
    <View style={styles.container}>
      {/* title section */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {categories.length > maxVisibleCategories && (
          <TouchableOpacity onPress={onSeeAll} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See All</Text>
            <IconButton icon="arrow-right" size={16} />
          </TouchableOpacity>
        )}
      </View>
      {/* list section */}
      <View style={styles.grid}>
        {visibleCategories.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <CategoryCard
              title={item.title}
              count={item.count}
              images={item.images}
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
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 16,
    color: '#753742',
    fontWeight: '500',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  cardContainer: {
    marginBottom: 5,
    width: SCREEN_WIDTH / 2 - 24, // Each card takes up 50% of the width minus margins
  },
});

export default CategoryList;
