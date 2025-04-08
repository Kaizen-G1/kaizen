import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  rating: number;
  onRatingChange?: (rating: number) => void; // optional
};

const StarRating: React.FC<Props> = ({ rating, onRatingChange }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;
        const starIcon = filled ? "star" : "star-o";

        // If onRatingChange is provided, make it tappable
        if (onRatingChange) {
          return (
            <TouchableOpacity
              key={star}
              onPress={() => onRatingChange(star)}
              style={{ marginHorizontal: 2 }}
            >
              <FontAwesome name={starIcon} size={24} color="#F4B400" />
            </TouchableOpacity>
          );
        }

        // Otherwise, just show the star as static
        return (
          <FontAwesome
            key={star}
            name={starIcon}
            size={24}
            color="#F4B400"
            style={{ marginHorizontal: 2 }}
          />
        );
      })}
    </View>
  );
};

export default StarRating;
