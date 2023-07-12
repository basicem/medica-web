import API from "./api";

export const getUsers = async (params) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.get("/api/users", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postUser = async (data) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.post("/api/users", {
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserBySlug = async (slug) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.get(`/api/users/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editUser = async (id, data) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.put(`/api/users/${id}`, {
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logIn = async (data) => {
  const response = await API.post(`/api/login`, data);
  return response.data;
};

export const getSession = async (data) => {
  const response = await API.get("/api/session", { params: data });
  return response.data;
};
