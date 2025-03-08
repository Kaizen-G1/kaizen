import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Order } from "./OrderTypes";
import config from "../../../../config/config";

class OrderRepository {
  async fetchOrders(): Promise<Order[]> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(
        `${config.API_URL}/api/v1/orders/companies/67a40eff40c34d9517f5aef0/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response.data.data.orders;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  }

  async fetchOrderById(orderId: string): Promise<Order> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(
        `${config.API_URL}/api/v1/orders/companies/67a40eff40c34d9517f5aef0/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response.data.data.orders;
    } catch (error) {
      throw new Error("Failed to fetch order details");
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        `${config.API_URL}/api/v1/orders/companies/67a40eff40c34d9517f5aef0/${orderId}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
