"use client";

import { useUserSession } from "@context/UserSessionContext";
import OfficeHour from "./OfficeHour";
import TaOfficeHour from "./TAOfficeHour";
import React from "react";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";

const OfficeHourWrapper = () => {
  const { course } = useOfficeHour();
  const { user } = useUserSession();
  if (user && course.tas.includes(user.id)) {
    return <TaOfficeHour />;
  } else {
    return <OfficeHour />;
  }
};

export default OfficeHourWrapper;
