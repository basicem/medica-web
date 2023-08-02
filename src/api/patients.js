import API from "./api";

export const getPatients = async (params) => {
  const response = await API.get("/api/patients", { params });
  return response.data;
};

export const searchPatients = async (params) => {
  const response = await API.get("/api/patients/search", { params });
  return response.data;
};

export const getPatientBySlug = async (slug) => {
  const response = await API.get(`/api/patients/slug/${slug}`);
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await API.get(`/api/patients/${id}`);
  return response.data;
};

export const postPatient = async (data) => {
  const response = await API.post("/api/patients", data);
  return response.data;
};

export const editPatient = async (id, data) => {
  const response = await API.put(`/api/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await API.delete(`/api/patients/${id}`);
  return response.data;
};

export const getMedications = async (params) => {
  const response = await API.get("/api/patients/medication", { params });
  return response.data;
};

export const postMedication = async (data) => {
  const response = await API.post("/api/patients/medication", data);
  return response.data;
};
