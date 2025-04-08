import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../services/constants";
import {
  getReviewsByProductThunk,
  reviewListAction,
} from "../../../screens/productReview/slice/ProductReviewSlice";
import StarRating from "../../../components/StarRating/StarRating";
import { RootStackParamList } from "../../../../RootNavigator";

type AllReviewsScreenRouteProp = RouteProp<RootStackParamList, "AllReviews">;

const AllReviewsScreen: React.FC = () => {
  const route = useRoute<AllReviewsScreenRouteProp>();
  const dispatch = useAppDispatch();
  const { productId } = route.params;

  const { loading, error, response } = useAppSelector(
    (state) => state.review.reviewList
  );

  useEffect(() => {
    dispatch(getReviewsByProductThunk(productId));

    return () => {
      dispatch(reviewListAction()); // Reset state on unmount
    };
  }, [dispatch, productId]);

  // Access reviews properly
  const reviews = response?.data.reviews || [];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.reviewContainer}>
      <Image
        source={{
          uri: item.avatarUrl || "https://www.gravatar.com/avatar/?d=mp", // fallback avatar
        }}
        style={styles.avatar}
      />
      <View style={styles.reviewContent}>
        <Text style={styles.name}>{item.customer_name}</Text>
        <StarRating rating={item.rating} />
        <Text style={styles.text}>{item.comment}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#BC6C25" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      {reviews.length === 0 ? (
        <Text>No reviews yet.</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => (item.id ?? "").toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  reviewContainer: { flexDirection: "row", marginBottom: 20 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#eee",
  },
  reviewContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  text: { fontSize: 14, color: "#333", marginTop: 6 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllReviewsScreen;
