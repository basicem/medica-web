import React, { useEffect } from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Patients from "components/Patients/Patients";
import { getSession } from "api/users";
import PatientCreate from "./Patients/PatientCreate";
import PatientDetail from "./Patients/PatientDetail";
import PatientEdit from "./Patients/PatientEdit";
import UsersRoot from "./Users/UsersRoot";
import LogIn from "./LogIn/LogIn";
import { useStore } from "./LogIn/StoreContext";
import AdminNav from "./AdminNav";
import DoctorNav from "./DoctorNav";

const Root = () => {
  // const [initialized, setInitialized] = useState(null);
  const { user, setUser } = useStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        // get the JWT
        const token = localStorage.getItem("Bearer");
        // ako token nije null
        if (!token && token !== "" && token !== undefined) {
          const data = {
            token,
          };
          // provjera tokena /api/session
          const response = await getSession(data);
          // ako je token ok postavit usera?
          // console.log("User trenutni je: ", response);
          setUser(response);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

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
        {user?.role === "Admin" && (
        <AdminNav />
        )}

        {user?.role === "Doctor" && (
        <DoctorNav />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/create" element={<PatientCreate />} />
          <Route path="/patients/:slug" element={<PatientDetail />} />
          <Route path="/patients/edit/:slug" element={<PatientEdit />} />
          <Route path="/users" element={<UsersRoot />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Root;
