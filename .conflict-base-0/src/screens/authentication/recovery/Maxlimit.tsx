import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Modal } from 'react-native';

export default function PasswordRecoveryScreen() {
  const [selectedMethod, setSelectedMethod] = useState('SMS');
  const [otp, setOtp] = useState(['', '', '', '']); // To store OTP values
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSendAgain = () => {
    // Simulate checking the OTP limit
    const otpString = otp.join('');
    if (otpString.length === 4) { // Assuming 4 digits is the max limit
      setIsModalVisible(true); // Show the modal when max limit is reached
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal when "Okay" is clicked
  };

  return (
    <View style={styles.container}>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual avatar URL
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>Enter 4 digits code we sent you on your phone number</Text>

      {/* Method Selection */}
      <Text style={styles.selectedMethodText}>
        Method Selected: {selectedMethod}
      </Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleSendAgain}>
        <Text style={styles.nextButtonText}>Send Again</Text>
      </TouchableOpacity>

      {/* Cancel Text */}
      <TouchableOpacity>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* Modal for Maximum Limit */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Maximum limit reached</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center', // Vertically centers content
    alignItems: 'center', // Horizontally centers content
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6E6E6E',
  },
  selectedMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220, // Adjust width for OTP inputs
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#6E6E6E',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5',
  },
  nextButton: {
    marginTop: 138,
    backgroundColor: '#A5642A',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: 335,
    height: 60,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'medium',
  },
  cancelText: {
    marginTop: 28,
    textAlign: 'center',
    fontSize: 14,
    color: '#6E6E6E',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: 280,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#A5642A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
