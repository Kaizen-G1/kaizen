import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import CircleItem from 'tenzai-components/components/CircleItem';

type CircleListProps = {
  title: string;
  items: { id: string; image: string }[];
  onPress: (label: string) => void;
};

const CircleList: React.FC<CircleListProps> = ({ title, items, onPress }) => {
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
    margin: 16,
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

export default CircleList;
