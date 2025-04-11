import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Order } from "./OrderTypes";
import API_ROUTES from "../../../../api/apiRoutes";
import { OrdersResponse } from "../../../../api/interfaces/orders-response";

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
      const ordersResponse: OrdersResponse = response.data;
      const orders: Order[] = ordersResponse.data.orders.map((order) => ({
        id: order.id,
        customer_id: order.customerId,
        products: order.products.map((product) => ({
          product_id: product.id,
          product_name: product.title,
          price: product.price,
          quantity: product.quantity,
          images: product.images || "https://example.com/image.jpg",
        })),
        total_price: order.totalPrice,
        status: order.status,
        created_date: order.created_date,
        updated_date: order.updated_date,
        companyName: order.companyName || "",
        companyAddress: order.companyAddress || "",
        customerName: order.customerName || "",
        customerPhone: order.customerPhone || "",
      }));
      return orders;
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
      const orderResponse: OrdersResponse = response.data;
      const order: Order[] = orderResponse.data.orders.map((order) => ({
        id: order.id,
        customer_id: order.customerId,
        products: order.products.map((product) => ({
          product_id: product.id,
          product_name: product.title,
          price: product.price,
          quantity: product.quantity,
          images: product.images,
        })),
        total_price: order.totalPrice,
        status: order.status,
        created_date: order.created_date,
        updated_date: order.updated_date,
        companyName: order.companyName || "",
        companyAddress: order.companyAddress || "",
        customerName: order.customerName || "",
        customerPhone: order.customerPhone || "",
      }));
      return order[0];
    } catch (error) {
      throw new Error("Failed to fetch order details");
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        // `${config.EXPO_PUBLIC_API_URL}/api/v1/orders/company/orders/`,
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
        { status, updated_date: new Date().toISOString() },
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
