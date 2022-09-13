import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeMenu from "components/HomeMenu";
import Patients from "components/Patients/Patients";
import AddPatient from "./Patients/AddPatient";

const Root = () => (
  <div>
    <Router>
      <HomeMenu />
      <Routes>
          <Route path="/Patients" element={<Patients />} />
          <Route path="/AddPatient" element={<AddPatient />} />
      </Routes>
    </Router>
  </div>
);

export default Root;
