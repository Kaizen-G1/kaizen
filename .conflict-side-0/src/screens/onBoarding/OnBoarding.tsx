import React, { useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Text as PaperText } from "react-native-paper";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

const OnboardingScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      image: "https://example.com/image1.png",
      title: "Welcome",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis.",
    },
    {
      image: "https://example.com/image2.png",
      title: "Get Ready",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const offset = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      offset.value = event.translationX;
    },
    onEnd: () => {
      if (offset.value < -100 && currentPage < pages.length - 1) {
        runOnJS(setCurrentPage)(currentPage + 1);
      } else if (offset.value > 100 && currentPage > 0) {
        runOnJS(setCurrentPage)(currentPage - 1);
      }

      offset.value = withSpring(0, { damping: 20, stiffness: 90 });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.page, animatedStyle]}>
            <Image
              source={{ uri: pages[currentPage].image }}
              style={styles.image}
            />
            <PaperText style={styles.title}>
              {pages[currentPage].title}
            </PaperText>
            <PaperText style={styles.description}>
              {pages[currentPage].description}
            </PaperText>
            {currentPage === pages.length - 1 && (
              <CustomButton label="Let’s Start" onPress={() => {alert("Getting Started!")}} />
            )}
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentPage ? "#A37549" : "#E5E5E5",
              },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gestureHandlerRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#A37549",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default OnboardingScreen;
