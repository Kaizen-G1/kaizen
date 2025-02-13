import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../services/constants";
import { fetchOrders } from "../slice/OrderSlice";

export function useOrderViewModel() {
  const dispatch = useAppDispatch();
  const { orders = [], loading, error } = useAppSelector((state) => state.orders || { orders: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer_id?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    const matchesFilter = selectedFilter === "All" || order.status?.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return {
    orders: filteredOrders,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
  };
}
