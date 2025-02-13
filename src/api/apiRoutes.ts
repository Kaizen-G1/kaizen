import config from "../config/config";

export const API_ROUTES = {
  auth: {
    login: `${config.API_URL}/api/v1/auth/login`,
    register: `${config.API_URL}/api/v1/auth/register`,
    verify2fa: `${config.API_URL}/api/v1/auth/verify-2fa`,
    getCustomerById: (customer_id: string) => `${config.API_URL}/api/v1/auth/getCustomerById/${customer_id}`,
    refreshToken: `${config.API_URL}/api/v1/auth/refresh-token`,
  },
  categories: {
    getAll: `${config.API_URL}/api/v1/categories/`,
    getWithSubcategories: `${config.API_URL}/api/v1/products/categories/subcategories/`,
    getById: (id: string) => `${config.API_URL}/api/v1/categories/${id}`,
  },
  company: {
    create: `${config.API_URL}/api/v1/company/`,
    get: (id: string) => `${config.API_URL}/api/v1/company/${id}`,
    getAll: `${config.API_URL}/api/v1/company/`,
    update: (id: string) => `${config.API_URL}/api/v1/company/${id}`,
    delete: `${config.API_URL}/api/v1/company/`,
  },
  dashboard: {
    get: `${config.API_URL}/api/v1/dashboard`,
  },
  orders: {
    create: `${config.API_URL}/api/v1/orders`,
    getAll: () => `${config.API_URL}/api/v1/orders/`,
    getOrderById: (id: string) => `${config.API_URL}/api/v1/orders/${id}`,
  },
  products: {
    create: `${config.API_URL}/api/v1/products`,
    get: (id: string) => `${config.API_URL}/api/v1/products/${id}`,
    getAll: `${config.API_URL}/api/v1/products/`,
    update: (id: string) => `${config.API_URL}/api/v1/products/${id}`,
    delete: (id: string) => `${config.API_URL}/api/v1/products/${id}`,
  },
  reviews: {
    create: `${config.API_URL}/api/v1/reviews`,
    get: (id: string) => `${config.API_URL}/api/v1/reviews/${id}`,
    getAll: (id: string) => `${config.API_URL}/api/v1/reviews/${id}`,
    update: (id: string) => `${config.API_URL}/api/v1/reviews/${id}`,
    delete: (id: string) => `${config.API_URL}/api/v1/reviews/${id}`,
  },
  shoppingCart: {
    addToCart: `${config.API_URL}/api/v1/shoppingCart/`,
    getCartList: `${config.API_URL}/api/v1/shoppingCart/`,
    getById: (id: string) => `${config.API_URL}/api/v1/shoppingCart/${id}`,
    update: (id: string) => `${config.API_URL}/api/v1/shoppingCart/${id}`,
    delete: (id: string) => `${config.API_URL}/api/v1/shoppingCart/${id}`,
  },
  wishlist: {
    addToWishlist: (id: string) => `${config.API_URL}/api/v1/wishlist/${id}`,
    getWishlist: (id: string) => `${config.API_URL}/api/v1/wishlist/${id}`,
    removeFromWishlist: (id: string) =>
      `${config.API_URL}/api/v1/wishlist/${id}`,
    clearWishlist: (id: string) => `${config.API_URL}/api/v1/wishlist/${id}`,
  },
  notifcation: {
    getAll: `${config.API_URL}/api/v1/notifications`,
    getById: (id: string) => `${config.API_URL}/api/v1/notifications/${id}`,
    create: `${config.API_URL}/api/v1/notifications/`,
    markAsRead: (id: string) => `${config.API_URL}/api/v1/notifications/${id}`,
    delete: (id: string) => `${config.API_URL}/api/v1/notifications/${id}`,
  },
};

export default API_ROUTES;
