import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton, Text, TextInput, Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  avatarUri?: string;
  searchQuery?: string;
  notificationCount?: number;
  onSearch?: (text: string) => void;
  onNotificationPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "Hello Emekus",
  subtitle = "Let's make sales today",
  avatarUri = "https://i.pinimg.com/736x/a6/ec/23/a6ec23ef9dcd2c6e9c15a7d9acbd443a.jpg",
  searchQuery,
  notificationCount = 0,
  onSearch,
  onNotificationPress,
}) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Avatar.Image
            size={60}
            source={{ uri: avatarUri }}
            style={{ backgroundColor: "gray" }}
          />
          <View style={styles.headerText}>
            <Text variant="titleMedium"> {title}</Text>
            <Text variant="bodySmall"> {subtitle}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon={() => <Icon name="bell-outline" size={30} color="#753742" />}
            onPress={onNotificationPress}
          />
          {notificationCount > 0 && (
            <Badge
              size={20}
              style={{
                position: "absolute",
                top: 0,
                right: -2,
                fontSize: 12,
                fontWeight: "900",
                color: "#fff",
                backgroundColor: "#9B2C2D",
              }}
            >
              {notificationCount}
            </Badge>
          )}
        </View>
      </View>

      <TextInput
        style={[styles.input, styles.textInput]}
        placeholder="Search"
        mode="outlined"
        activeOutlineColor="#753742"
        outlineColor="transparent"
        selectionColor="#753742"
        placeholderTextColor="#BEBEBE"
        value={searchQuery}
        onChangeText={onSearch}
        outlineStyle={{ borderRadius: 10, borderColor: "#753742" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",

    marginVertical: 10,
    marginHorizontal: 20,
  },
  textInput: {
    color: "black",
  },
});

export default Header;
