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

export const getMedications = async (id, params) => {
  const response = await API.get(`/api/patients/${id}/medications`, { params });
  return response.data;
};

export const postMedication = async (id, data) => {
  const response = await API.post(`/api/patients/${id}/medications`, data);
  return response.data;
};

export const deleteMedication = async (id, medicationId) => {
  const response = await API.delete(`/api/patients/${id}/medications/${medicationId}`);
  return response.data;
};

export const editMedication = async (id, medicationId, data) => {
  const response = await API.put(`/api/patients/${id}/medications/${medicationId}`, data);
  return response.data;
};

// export const getVitals = async (id, params) => {
//   const response = await API.get(`/api/patients/${id}/medications`, { params });
//   return response.data;
// };

export const getVitals = async (id) => {
  const response = await API.get(`/api/patients/${id}/vitals`);
  return response.data;
};

export const postVital = async (id, data) => {
  const response = await API.post(`/api/patients/${id}/vitals`, data);
  return response.data;
};
