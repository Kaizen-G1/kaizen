import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_ROUTES from "./../../api/apiRoutes"
import { RootStackParamList } from "../../../RootNavigator";

type ReviewScreenRouteProp = RouteProp<RootStackParamList, "ProductReview">;

const ProductReviewScreen = () => {
  const route = useRoute<ReviewScreenRouteProp>();
  const { productId } = route.params;

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews by product_id
  const fetchReviews = async () => {
    // console.log("Fetching reviews for Order Id:", productId);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit new review
  const handleAddReview = async () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Comment cannot be empty!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        productId,
        customer_id: "10000", // Use actual customer_id here
        rating,
        comment,
      };

      await axios.post(API_ROUTES.reviews.create, payload);
      Alert.alert("Success", "Review added successfully!");
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
      Alert.alert("Error", "Failed to add review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Reviews</Text>
      {/* {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewText}>{item.comment}</Text>
              <Text style={styles.reviewRating}>Rating: {item.rating}/5</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No reviews yet.</Text>
      )} */}

      <TextInput
        style={styles.input}
        placeholder="Leave a review..."
        value={comment}
        onChangeText={setComment}
      />
      <Button title={isSubmitting ? "Submitting..." : "Submit Review"} onPress={handleAddReview} disabled={isSubmitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  reviewItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  reviewText: { fontSize: 16, marginBottom: 5 },
  reviewRating: { fontSize: 14, color: "#666" },
  emptyText: { fontSize: 16, color: "#666", marginTop: 20 },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ProductReviewScreen;
