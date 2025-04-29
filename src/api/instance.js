import axios from "axios";


const apiInstance = axios.create({
  //  baseURL: "https://webdefender-backend.onrender.com",
  baseURL: 'http://127.0.0.1:8002',
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const publicRoutes = [
  "/api/auth/register",
  "/api/auth/login"
];

apiInstance.interceptors.request.use(
  (config) => {
    // Check if the current route is public
    const isPublicRoute = publicRoutes.some((route) =>
      config.url.includes(route)
    );

    if (!isPublicRoute) {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        config.headers["Authorization"] = `Bearer ${storedToken}`;
      } else {
        console.log("No token found for protected route.");
      }
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default apiInstance;
