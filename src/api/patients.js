import API from "./api";

export const getPatients = async (params) => {
  const response = await API.get("/api/patients", { params });
  return response.data;
};

export const postPatient = async (data) => {
  const response = await API.post("/api/patients", data);
  return response.data;
};
