import React, { useEffect, useState } from "react";

import DoctorList from "components/Doctors/DoctorList";
import Loader from "components/Loader";
import getDoctors from "api/doctors";

const Doctors = () => {
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [rows, setRows] = useState(null);
  const [blooper, setBlooper] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getDoctors();
        setCount(response.count);
        setNextPage(response.nextPage);
        setRows(response.rows);
        setBlooper(response.error);
      } catch (error) {
        console.log(error.response.data);
        setBlooper(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <Loader isActive={loading} />
      <DoctorList
        count={count}
        nextPage={nextPage}
        rows={rows}
        error={blooper}
      />
    </div>
  );
};

export default Doctors;
