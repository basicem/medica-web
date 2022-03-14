import React, { useEffect, useState } from "react";

import DoctorList from "components/Doctors/DoctorList";
import { getDoctors } from "api/doctors";

const Doctors = () => {
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [rows, setRows] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetch = async () => {
      const response = await getDoctors();
      setCount(response.count);
      setNextPage(response.nextPage);
      setRows(response.rows);
      setError(response.error);
    };

    fetch();
  }, []);
  return (
    <div>
      <DoctorList count={count} nextPage={nextPage} rows={rows} error={error} />
    </div>
  );
};

export default Doctors;
