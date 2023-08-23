import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: undefined,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApiInstance.interceptors.response.use(
  (response) => {
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
      } else {
        return;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
      const response = await axiosApiInstance.post("api/refresh-token", { refreshToken });
      localStorage.setItem("todo-token", JSON.stringify(response.data.token));
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
