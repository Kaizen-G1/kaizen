import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../RootNavigator";
import { useAppDispatch, useAppSelector } from "../../services/constants";
import {
  saveReviewThunk,
  getReviewsByProductThunk,
} from "../productReview/slice/ProductReviewSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "../../components/StarRating/StarRating";

type ReviewScreenRouteProp = RouteProp<RootStackParamList, "ProductReview">;

const ProductReviewScreen = () => {
  const route = useRoute<ReviewScreenRouteProp>();
  const { productId } = route.params;

  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector(
    (state) => state.review.reviewSave
  );

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    // dispatch(getReviewsByProductThunk(productId));
  }, [dispatch, productId]);

  const handleAddReview = async () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Comment cannot be empty!");
      return;
    }

    const customer_id = await AsyncStorage.getItem("vendorId");
    const customerName = await AsyncStorage.getItem("customerName");

    const payload = {
      product_id: productId,
      customer_id: customer_id || "",
      customer_name: customerName || "Anonymous",
      rating,
      comment,
    };

    dispatch(saveReviewThunk(payload)).then(() => {
      if (success) {
        Alert.alert("Success", "Review added successfully!");
        setComment("");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to add review.");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Reviews</Text>

      <StarRating rating={rating} onRatingChange={setRating} />

      <TextInput
        style={styles.input}
        placeholder="Leave a review..."
        value={comment}
        onChangeText={setComment}
      />
      <Button
        title={loading ? "Submitting..." : "Submit Review"}
        onPress={handleAddReview}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProductReviewScreen;
