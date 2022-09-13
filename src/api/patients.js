import API from "./api";

const getPatients = async (params) => {
  const response = await API.get("/api/patients", { params });
  return response.data;
};

const postPatients = async (params) => {
  const response = await API.post("/api/patients", {
    image: params.image,
    firstName: params.firstName,
    lastName: params.lastName,
    address: params.address,
    city: params.city,
    phoneNumber: params.phoneNumber,
    email: params.email
  });
  return response.data;
};

export {getPatients, postPatients};
