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
  createdDate: Date;
  updatedDate: Date;
  companyName?: string;
  companyAddress?: string;
  customerName?: string;
  customerPhone?: string;
}

interface Products {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
