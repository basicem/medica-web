import API from "./api";

export const getPatients = async (params) => {
  const response = await API.get("/api/patients", { params });
  return response.data;
};

export const getPatientBySlug = async (slug) => {
  const response = await API.get(`/api/patients/${slug}`);
  return response.data;
};

export const postPatient = async (data) => {
  const response = await API.post("/api/patients", data);
  return response.data;
};

export const editPatient = async (data) => {
  const response = await API.put("/api/patients", data);
  return response.data;
};

export const deletePatient = async (slug) => {
  const response = await API.delete(`/api/patients/${slug}`);
  return response.data;
};
