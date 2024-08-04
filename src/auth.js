import axios from "axios";

export const getToken = () => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch current user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const refreshAuthToken = async () => {
  try {
    const response = await axios.post(
      "https://dummyjson.com/auth/refresh",
      {
        refreshToken: getRefreshToken(),
        expiresInMins: 30,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, refreshToken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to refresh auth token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
