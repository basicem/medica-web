import API from "./api";

export const postAppointment = async (data) => {
  const response = await API.post("/api/appointments", data);
  return response.data;
};

export const getAppointmentBySlug = async (slug) => {
  const response = await API.get(`/api/appointments/${slug}`);
  return response.data;
};

export const getAppointmentsByDoctorId = async (id) => {
  const response = await API.get(`/api/appointments/doctor/${id}`);
  return response.data;
};
