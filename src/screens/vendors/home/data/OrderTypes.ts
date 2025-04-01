export interface Product {
  product_id: string;
  product_name?: string;
  price?: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customer_id: string;
  products: Product[];
  total_price: number;
  status: "Pending" | "Awaiting Pickup" | "In transit" | "Complete" | "Cancelled";
  created_date: Date;
  updated_date: Date;
  companyName: string;
  companyAddress: string;
  customerName: string;
  customerPhone: string;
}
