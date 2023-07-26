import API from "./api";

export const getAppointmentsByDoctor = async (params) => {
  const response = await API.get(`/api/appointments`, { params });
  return response.data;
};

export const postAppointment = async (data) => {
  const response = await API.post("/api/appointments", data);
  return response.data;
};

export const updateStatus = async (slug, data) => {
  const response = await API.put(`/api/appointments/${slug}/status`, data);
  return response.data;
};

export const updateStatusPublic = async (slug, data) => {
  const response = await API.put(`/api/appointments/public/${slug}/status`, data);
  return response.data;
};

export const getAppointmentBySlug = async (slug) => {
  const response = await API.get(`/api/appointments/slug/${slug}`);
  return response.data;
};

export const getAppointmentBySlugPublic = async (slug) => {
  const response = await API.get(`/api/appointments/public/${slug}`);
  return response.data;
};
