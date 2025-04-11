import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from "react-native";

type ImageSliderProps = {
  data: {
    id: string;
    imageUrl: string;
  }[];
  handleImagePress: (id: string) => void;
  gap?: number;
  autoSlideInterval?: number;
};

const BannerCarousel = ({
  data,
  handleImagePress,
  gap = 10,
  autoSlideInterval = 3000,
}: ImageSliderProps) => {
  const windowWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const cardWidth = windowWidth - 32 - gap;
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (cardWidth + gap),
        animated: true,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (cardWidth + gap));
    setActiveIndex(index);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [activeIndex]);

  const startAutoSlide = () => {
    if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      scrollToIndex(nextIndex);
      setActiveIndex(nextIndex);
    }, autoSlideInterval);
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={() => {
          if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
        }}
        onTouchEnd={startAutoSlide}
        decelerationRate="fast"
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              {
                width: cardWidth,
                marginHorizontal: gap / 2,
              },
            ]}
            onPress={() => handleImagePress(item.id)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
            onPress={() => {
              scrollToIndex(index);
              setActiveIndex(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 9,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    backgroundColor: "#D8BD8A",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#BC6C25",
    width: 40,
    height: 10,
    borderRadius: 5,
  },
});

export default BannerCarousel;
