import OfficeHour from "@/app/components/OfficeHour";
import TAOfficeHour from "@/app/components/TAOfficeHour";
import OfficeHourWrapper from "@/app/components/OfficeHourWrapper";
import React from "react";
interface PageProps {
  params: {
    courseId: string;
  };
  searchParams?: { [key: string]: string };
}

const Page = async ({ params, searchParams }: PageProps) => {
  //Fetch Courses

  return <OfficeHourWrapper />;
};

export default Page;
