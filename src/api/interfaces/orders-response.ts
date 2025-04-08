export interface OrdersResponse {
  status: string;
  data: OrdersData;
}

interface OrdersData {
  orders: Orders[]
}

interface Orders {
  id: string;
  customerId: string;
  companyId: string;
  products: Products[];
  totalPrice: number;
  status: "Pending" | "Awaiting Pickup" | "In transit" | "Complete" | "Cancelled";
  created_date: Date;
  updated_date: Date;
  companyName?: string;
  companyAddress?: string;
  customerName?: string;
  customerPhone?: string;
}

interface Products {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
}
