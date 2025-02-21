import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton, Card, PaperProvider } from 'react-native-paper';
import CustomIcon from "tenzai-components/components/CustomIcon/CustomIcon";
import Counter from "../../components/counter/Counter";
import CustomButton from "tenzai-components/components/CustomButton/CustomButton";

export default function CartScreen() {
  return (
    <>
      <PaperProvider>
        <ScrollView style={{ flex: 1, padding: 16 }}>

          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Cart</Text>
            <View style={{ backgroundColor: "#6B3A2A", borderRadius: 50, paddingHorizontal: 13, paddingVertical: 7 }}>
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>2</Text>
            </View>
          </View>

          {/* Shipping Address */}
          <Card style={{ marginVertical: 16, padding: 16, backgroundColor: "#F9F9F9" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              {/* Columna para Shipping Address y Dirección */}
              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Shipping Address</Text>
                <Text>50 Charles Street East, Toronto ON M5C 0A6</Text>
              </View>

              {/* Columna para el botón de edición */}
              <TouchableOpacity style={styles.editButton}>
                <CustomIcon icon="pencil" type="circle" />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Cart Items */}
          {[1, 2, 3, 4, 5].map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Card style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: "https://www.apple.com/v/watch/bp/images/overview/consider_modals/fitness/modal_fitness_rings__cznvg9yafq82_xlarge.jpg",
                    }}
                    style={styles.productImage}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    style={styles.deleteButton}
                    iconColor="#693B3B"
                    onPress={() => console.log("Delete item")}
                  />
                </View>
              </Card>

              {/* Nuevo contenedor de información */}
              <View style={styles.itemsFooterContainer}>
                {/* Contenedor de título y descripción */}
                <View style={styles.infoContainer}>
                  <Text style={styles.productDescription}>Lorem ipsum dolor sit amet consectetur.</Text>
                  <Text style={styles.productDetails}>Pink, Size M</Text>
                </View>

                {/* Contenedor de precio y contador */}
                <View style={styles.priceAndCounterContainer}>
                  <Text style={styles.productPrice}>$17.00</Text>
                  <Counter />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Total & Checkout */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#F8F8F8" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total $34.00</Text>
          <CustomButton
            label="Checkout"
            onPress={() => console.log("Checkout...")}
          />
        </View>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  listcontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    marginVertical: 5,
  },
  timerText: {
    backgroundColor: "#753742",
    borderRadius: 7,
    color: "#FFFFFF",
    padding: 5,
    fontFamily: "Raleway-Regular",
    marginHorizontal: 2,
  },
  cartContainer: {
    padding: 10,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "white",
  },
  itemsFooterContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "column",
  },
  priceAndCounterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  productDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cartCount: {
    backgroundColor: "#6B3A2A",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
  }
});
