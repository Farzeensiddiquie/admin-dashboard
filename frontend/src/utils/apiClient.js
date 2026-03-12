import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;