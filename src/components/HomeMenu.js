import React, { useState } from "react";
import AdminNav from "./AdminNav";
import DoctorNav from "./DoctorNav";

const HomeMenu = () => {
  const [logged, setLogged] = useState(true);
  return (
    <div>
      {logged ? <AdminNav /> : <DoctorNav />}
    </div>
  );
};

export default HomeMenu;
