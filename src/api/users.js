import API from "./api";

export const getUsers = async (params) => {
  const response = await API.get("/api/users", { params });
  return response.data;
};

export const postUser = async (data) => {
  const response = await API.post("/api/users", data);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await API.get(`/api/users/${id}`);
  return response.data;
};

export const editUser = async (id, data) => {
  const response = await API.put(`/api/users/${id}`, data);
  return response.data;
};

export const getSession = async () => {
  const response = await API.get("/api/auth/session");
  return response.data;
};

export const logIn = async (data) => {
  const response = await API.post(`/api/auth/login`, data);
  return response.data;
};
