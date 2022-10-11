import API from "./api";

export const getUsers = async (params) => {
  const response = await API.get("/api/users", { params });
  return response.data;
};

export const postUser = async (data) => {
  const response = await API.post("/api/users", data);
  return response.data;
};
