import API from "./api";

export const getVitals = async () => {
  const response = await API.get("/api/vitals");
  return response.data;
};

export const postVital = async (data) => {
  const response = await API.post("/api/vitals", data);
  return response.data;
};
