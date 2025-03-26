import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface NotifyCardProps {
  title?: string;
  time?: string;
  message?: string;
  isRead?: boolean;
  onPress?: () => void;
}

export default function NotifyCard({
  title,
  time,
  message,
  isRead = false,
  onPress,
}: NotifyCardProps) {
  function timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
    }
    return (
      Math.floor(seconds) + " second" + (seconds !== 1 ? "s" : "") + " ago"
    );
  }

  const notifyTime = new Date(time ?? "");
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 10,
        minHeight: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.102,
        shadowRadius: 10,
        elevation: 2,
        borderRadius: 8,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {title ?? "Title not found"}
              </Text>

              {!isRead && (
                <View
                  style={{
                    backgroundColor: "red",
                    borderRadius: 5,
                    padding: 4,
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", fontSize: 12, color: "white" }}
                  >
                    {" "}
                    Unread
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{ fontWeight: "semibold", fontSize: 12, color: "gray" }}
            >
              {timeAgo(notifyTime) ?? "Time not found"}
            </Text>
          </View>
          <Text
            style={{
              width: "95%",
              textAlign: "justify",
              fontSize: 14,
              letterSpacing: 0.3,
            }}
          >
            {message ?? "Message not found yet"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
