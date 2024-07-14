"use client";

import OfficeHour from "./OfficeHour";
import TaOfficeHour from "./TAOfficeHour";
import React from "react";

const OfficeHourWrapper = () => {
  // Role is hardcoded for now
  const role = "student";

  if (role === "student") {
    return <OfficeHour />;
  } else {
    return <TaOfficeHour />;
  }
};

export default OfficeHourWrapper;
