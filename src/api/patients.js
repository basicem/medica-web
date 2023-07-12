import API from "./api";

export const getPatients = async (params) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.get("/api/patients", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPatientBySlug = async (slug) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.get(`/api/patients/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postPatient = async (data) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.post("/api/patients", {
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editPatient = async (id, data) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.put(`/api/patients/${id}`, {
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deletePatient = async (id) => {
  const token = localStorage.getItem("Bearer");
  const response = await API.delete(`/api/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
