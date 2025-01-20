import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Card, Text } from "react-native-paper";

interface BannerProps {
  imageUrl: string; // Prop for the image URL
}

const Banner: React.FC<BannerProps> = ({ imageUrl }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.imageContainer}>
        <Card.Cover
          source={{ uri: imageUrl }} // Use the imageUrl prop
          style={styles.imageBackground}
        />
        <View style={styles.textContainer}>
          <Text variant="displayMedium" style={styles.title}>
            Big Sale
          </Text>
          <Text variant="titleLarge" style={styles.subtitle}>
            Up to 50%
          </Text>
          <Text variant="bodyLarge" style={styles.caption}>
            Happening Now
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    // overflow: "hidden", // Keep the image and text within the rounded corners
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  imageContainer: {
    position: "relative", // Make the image container relative
    backgroundColor: "red",
  },
  imageBackground: {
    height: 200,
    borderRadius: 16, // Apply borderRadius directly to the image for consistency
  },
  textContainer: {
    position: "absolute", // Position the text absolutely on top of the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start", // Align to the left side
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add background overlay for readability
  },
  title: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontWeight: "500",
    color: "#FFFFFF",
    marginVertical: 4,
  },
  caption: {
    fontWeight: "400",
    color: "#FFFFFF",
  },
});

export default Banner;
