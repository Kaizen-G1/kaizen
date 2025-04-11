import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Text } from "react-native-paper";

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  caption: string;
}

const Banner: React.FC<BannerProps> = ({
  imageUrl,
  title,
  subtitle,
  caption,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  imageBackground: {
    height: 200,
    width: "100%",
    borderRadius: 16,
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
