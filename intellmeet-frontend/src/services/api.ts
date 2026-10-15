
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle errors from API responses.
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "API error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error(
          "No response received from the server:",
          error.message
        );
      } else {
        console.error("Request setup error:", error.message);
      }
    } else {
      console.error("Unexpected API error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
