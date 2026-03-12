import api from "../utils/apiClient";

export const getTasks = async () => {
  const response = await api.get("/api");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/api", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.patch(`/api/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/api/${id}`);
  return response.data;
};