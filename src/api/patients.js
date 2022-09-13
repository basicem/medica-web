import API from "./api";

const getPatients = async (params) => {
  const response = await API.get("/api/patients", { params });
  return response.data;
};

export default getPatients;
