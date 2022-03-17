import API from "./api";

const getDoctors = async () => {
  const response = await API.get("/api/doctors");
  return response.data;
};

export default getDoctors;
