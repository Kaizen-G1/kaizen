import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface AlertModalProps {
  title: string;
  visible: boolean;
  isError?: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  btnlabel?: string;
  message?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  visible,
  isError = false,
  isLoading = false,
  onClose,
  onPress,
  btnlabel = "",
  message = "Your card has been successfully charged",
}) => {
  // Animated scale for the icon
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 8,
        bounciness: 8,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Animated Icon positioned above the modal */}
          <Animated.View
            style={[
              styles.iconContainer,
              { transform: [{ scale: scaleAnim }] },
              { zIndex: 1 },
              {
                backgroundColor: isLoading
                  ? "#004BFE"
                  : isError
                  ? "#9B2C2D"
                  : "#2E7D32",
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Ionicons
                name={isError ? "alert-sharp" : "checkmark-sharp"}
                size={30}
                color="white"
              />
            )}
          </Animated.View>

          {/* Overlapping container */}
          <View style={[styles.overlapContainer, { zIndex: 0 }]} />

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Button */}
          {btnlabel && (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isLoading
                    ? "#004BFE"
                    : isError
                    ? "#9B2C2D"
                    : "#2E7D32",
                },
              ]}
              onPress={onPress}
            >
              <Text style={styles.buttonText}>{btnlabel}</Text>
            </TouchableOpacity>
          )}

          {/* Close */}
          {onClose && (
            <TouchableOpacity style={styles.closeArea} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    position: "absolute", // Icon outside modal box
    top: -25, // Adjusted top to give better visibility with overlap
    width: 50, // Slightly larger for better visual balance
    height: 50, // Same size as width
    borderRadius: 40, // Circle shape for icon
    justifyContent: "center",
    alignItems: "center",
  },
  overlapContainer: {
    position: "absolute",
    top: -40, // Align with the icon container
    width: 80, // Slightly larger width for visual separation
    height: 80, // Slightly larger height for better overlap effect
    borderRadius: 45, // Keep it round for consistency
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5, // Visible shadow for Android
  },
  title: {
    fontSize: 22, // Increased size for better readability
    fontWeight: "600",
    marginBottom: 12, // Adjusted margin for balance
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 12, // Added margin for better separation
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  closeArea: {
    marginTop: 10,
  },
  closeText: {
    fontSize: 14,
    color: "#999",
  },
});

export default AlertModal;
