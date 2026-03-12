import api from "../utils/apiClient";

export const loginUser = async (data) => {
  const response = await api.post("/api/users/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/api/users/register", data);
  return response.data;
};