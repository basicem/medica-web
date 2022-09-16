import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomeMenu from "components/HomeMenu";
import Patients from "components/Patients/Patients";
import AddPatient from "./Patients/PatientCreate";

const Root = () => (
  <div>
    <Router>
      <HomeMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/create" element={<AddPatient />} />
      </Routes>
    </Router>
  </div>
);

export default Root;
