import { CartPayload } from "../../../cart/slice/CartSlice";
import { ProductPayload } from "../../product/slice/ProductSlice";

export interface Product {
  product_id: string;
  title?: string;
  price?: number;
  quantity: number;
  images: string[];
  product: CartPayload;
  totalPrice: number;
}

export interface Order {
  id: string;
  customer_id: string;
  products: Product[];
  total_price: number;
  status:
    | "Pending"
    | "Awaiting Pickup"
    | "In transit"
    | "Complete"
    | "Cancelled";
  created_date: Date;
  updated_date: Date;
  companyName: string;
  companyAddress: string;
  customerName: string;
  customerPhone: string;
}
