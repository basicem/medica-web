import API from "./api";

export const getDoctors = async () => {
  const response = await API.get("/api/doctors");
  return response.data;
};
