import API from "./api";

export const getVitals = async (params) => {
  const response = await API.get("/api/vitals", { params });
  return response.data;
};

export const postVital = async (data) => {
  const response = await API.post("/api/vitals", data);
  return response.data;
};

export const editVital = async (id, data) => {
  const response = await API.put(`/api/vitals/${id}`, data);
  return response.data;
};
