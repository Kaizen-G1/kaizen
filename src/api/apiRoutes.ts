import config from "../config/config";

export const API_ROUTES = {
  auth: {
    login: `${config.EXPO_PUBLIC_API_URL}/api/v1/auth/login`,
    register: `${config.EXPO_PUBLIC_API_URL}/api/v1/auth/register`,
    verify2fa: `${config.EXPO_PUBLIC_API_URL}/api/v1/auth/verify-2fa`,
    getCustomerById: (customer_id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/auth/getCustomerById/${customer_id}`,
    refreshToken: `${config.EXPO_PUBLIC_API_URL}/api/v1/auth/refresh-token`,
  },
  categories: {
    getAll: `${config.EXPO_PUBLIC_API_URL}/api/v1/categories/`,
    getAllSubcategories: `${config.EXPO_PUBLIC_API_URL}/api/v1/categories/subcategories`,
    getWithSubcategories: `${config.EXPO_PUBLIC_API_URL}/api/v1/products/categories/subcategories/`,
    getById: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/categories/${id}`,
  },
  company: {
    create: `${config.EXPO_PUBLIC_API_URL}/api/v1/company/`,
    get: (id: string) => `${config.EXPO_PUBLIC_API_URL}/api/v1/company/${id}`,
    getAll: `${config.EXPO_PUBLIC_API_URL}/api/v1/company/`,
    update: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/company/${id}`,
    delete: `${config.EXPO_PUBLIC_API_URL}/api/v1/company/`,
  },
  dashboard: {
    get: `${config.EXPO_PUBLIC_API_URL}/api/v1/dashboard`,
  },
  orders: {
    create: `${config.EXPO_PUBLIC_API_URL}/api/v1/orders`,
    getAll: () => `${config.EXPO_PUBLIC_API_URL}/api/v1/orders/`,
    getOrderById: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/orders/${id}`,
  },
  products: {
    create: `${config.EXPO_PUBLIC_API_URL}/api/v1/products`,
    get: (id: string) => `${config.EXPO_PUBLIC_API_URL}/api/v1/products/${id}`,
    getAll: `${config.EXPO_PUBLIC_API_URL}/api/v1/products/`,
    getAllCustomers: `${config.EXPO_PUBLIC_API_URL}/api/v1/customer/products`,

    update: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/products/${id}`,
    delete: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/products/${id}`,
  },
  reviews: {
    create: `${config.EXPO_PUBLIC_API_URL}/api/v1/reviews`,
    get: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/reviews/product/${id}`,
    getAll: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/reviews/${id}`,
    update: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/reviews/${id}`,
    delete: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/reviews/${id}`,
  },
  shoppingCart: {
    addToCart: `${config.EXPO_PUBLIC_API_URL}/api/v1/shoppingCart/`,
    getCartList: `${config.EXPO_PUBLIC_API_URL}/api/v1/shoppingCart/`,
    getById: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/shoppingCart/${id}`,
    update: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/shoppingCart/${id}`,
    delete: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/shoppingCart/${id}`,
  },
  wishlist: {
    addToWishlist: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/wishlist/${id}`,
    getWishlist: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/wishlist/${id}`,
    removeFromWishlist: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/wishlist/${id}`,
    clearWishlist: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/wishlist/${id}`,
  },
  notifcation: {
    getAll: `${config.EXPO_PUBLIC_API_URL}/api/v1/notifications`,
    getById: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/notifications/${id}`,
    create: `${config.EXPO_PUBLIC_API_URL}/api/v1/notifications/`,
    markAsRead: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/notifications/${id}`,
    delete: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/notifications/${id}`,
  },

  search: {
    getAll: `${config.EXPO_PUBLIC_API_URL}/api/v1/search`,
  },

  flashSale: {
    enable: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/flash/enable/${id}`,
    disable: (id: string) =>
      `${config.EXPO_PUBLIC_API_URL}/api/v1/flash/disable/${id}`,
    getAll: `${config.EXPO_PUBLIC_API_URL}/api/v1/flash/active`,
  },
};

export default API_ROUTES;
