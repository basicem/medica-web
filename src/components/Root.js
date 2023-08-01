import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getSession } from "api/users";
import Patients from "components/Patients/Patients";
import { ROLES } from "utils/constants";
import PatientCreate from "./Patients/PatientCreate";
import PatientDetail from "./Patients/PatientDetail";
import PatientEdit from "./Patients/PatientEdit";
import UsersRoot from "./Users/UsersRoot";
import LogIn from "./LogIn/LogIn";
import { useStore } from "./LogIn/StoreContext";
import AdminNav from "./AdminNav";
import DoctorNav from "./DoctorNav";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "./Forbidden";
import Calendar from "./Appointments/Calendar";
import AppointmentCreate from "./Appointments/AppointmentCreate";
import AppointmentDetail from "./Appointments/AppointmentDetail";
import AppointmentConfirmation from "./Appointments/AppointmentConfirmation";

const Root = () => {
  const [initialized, setInitialized] = useState(false);
  const { user, setUser } = useStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getSession();
        setUser(response);
      } catch (e) {
        console.log(e);
      } finally {
        setInitialized(true);
      }
    };

    fetch();
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        {user?.role === "Admin" && <AdminNav />}
        {user?.role === "Doctor" && <DoctorNav />}

        <Routes>

          {/* Not protected Routes, no tekn required */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/appointments/patients/:slug" element={<AppointmentConfirmation />} />

          {/* Protected routes with ProtectedRoute component */}

          <Route
            path="/appointments"
            element={(
              <ProtectedRoute
                element={<Calendar />}
                allowedRoles={[ROLES.DOCTOR]}
              />
)}

          />
          <Route
            path="/appointments/create"
            element={(
              <ProtectedRoute
                element={<AppointmentCreate />}
                allowedRoles={[ROLES.DOCTOR]}
              />
)}
          />

          <Route
            path="/appointments/:slug"
            element={(
              <ProtectedRoute
                element={<AppointmentDetail />}
                allowedRoles={[ROLES.DOCTOR]}
              />
)}
          />

          <Route
            path="/patients"
            element={<ProtectedRoute element={<Patients />} allowedRoles={[ROLES.DOCTOR]} />}
          />
          <Route
            path="/patients/create"
            element={<ProtectedRoute element={<PatientCreate />} allowedRoles={[ROLES.DOCTOR]} />}
          />
          <Route
            path="/patients/:slug"
            element={<ProtectedRoute element={<PatientDetail />} allowedRoles={[ROLES.DOCTOR]} />}
          />
          <Route
            path="/patients/edit/:slug"
            element={<ProtectedRoute element={<PatientEdit />} allowedRoles={[ROLES.DOCTOR]} />}
          />
          <Route
            path="/users"
            element={<ProtectedRoute element={<UsersRoot />} allowedRoles={[ROLES.ADMIN]} />}
          />

          {/* Route for forbidden access */}
          <Route path="/forbidden" element={<Forbidden />} />

          {/* Redirect unknown routes to the forbidden page */}
          <Route path="*" element={<Navigate to="/forbidden" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Root;
