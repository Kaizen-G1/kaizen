import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    marginVertical: 10,
  },
  scrollViewContent: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  chip: {
    marginRight: 8,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    minWidth: 80,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export const getStatusStyle = (status: string) => {
  // TODO: Create enums for order status
  switch (status) {
    case "Pending":
      return { backgroundColor: "#315731", textColor: "#FFFFFF" };
    case "Awaiting Pickup":
      return { backgroundColor: "#BC6C25CC", textColor: "#FFFFFF" };
    case "In transit":
      return { backgroundColor: "#0754EA33", textColor: "#0754EA" };
    case "Complete":
      return { backgroundColor: "#EAFFEA", textColor: "#324E32" };
    case "Cancelled":
      return { backgroundColor: "#9B2C2D", textColor: "#FFFFFF" };
    default:
      return { backgroundColor: "#E5E5E5", textColor: "#333" };
  }
};
