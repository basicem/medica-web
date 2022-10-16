import React from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomeMenu from "components/HomeMenu";
import Patients from "components/Patients/Patients";
import PatientCreate from "./Patients/PatientCreate";
import PatientDetail from "./Patients/PatientDetail";
import PatientEdit from "./Patients/PatientEdit";
import Users from "./Users/Users";
import UserModalEdit from "./Users/UserModalEdit";

const Root = () => (
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
      <HomeMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/create" element={<PatientCreate />} />
        <Route path="/patients/:slug" element={<PatientDetail />} />
        <Route path="/patients/edit/:slug" element={<PatientEdit />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/edit:slug" element={<UserModalEdit />} />
      </Routes>
    </Router>
  </div>
);

export default Root;
