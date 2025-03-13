import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Order } from "./OrderTypes";
import API_ROUTES from "../../../../api/apiRoutes";

class OrderRepository {
  async fetchOrders(): Promise<Order[]> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(API_ROUTES.orders.getAll(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: await AsyncStorage.getItem("vendorId"),
          userRole: await AsyncStorage.getItem("userRole"),
        },
      });
      return response.data.data.orders;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  }

  async fetchOrderById(orderId: string): Promise<Order> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(
        API_ROUTES.orders.getOrderById(orderId),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.order);
      return response.data.data.orders;
    } catch (error) {
      throw new Error("Failed to fetch order details");
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        // `${config.API_URL}/api/v1/orders/company/orders/`,
        API_ROUTES.orders.create,
        order,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.order;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        API_ROUTES.orders.getOrderById(orderId),
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.order;
    } catch (error) {
      throw new Error("Failed to update order status");
    }
  }
}

export default new OrderRepository();
