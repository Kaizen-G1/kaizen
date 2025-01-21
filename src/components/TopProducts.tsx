import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import CircleItem from 'tenzai-components/components/CircleItem';

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
      >
        {items.map((item) => (
          <CircleItem
            key={item.id}
            image={item.image}
            onPress={() => onPress(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default TopProducts;
