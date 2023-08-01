import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("error", originalRequest);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      let refreshToken = localStorage.getItem("todo-refresh");
      if (refreshToken) {
        refreshToken = JSON.parse(refreshToken);
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
      const response = await axiosApiInstance.post("api/refresh-token", { refreshToken });
      localStorage.setItem("todo-token", JSON.stringify(response.data.token));
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
