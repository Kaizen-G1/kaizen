export interface Product {
  product_id: string;
  product_name?: string;
  price?: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string;
  products: Product[];
  total_price: number;
  status: "Pending" | "Awaiting Pickup" | "In transit" | "Complete" | "Cancelled";
}
