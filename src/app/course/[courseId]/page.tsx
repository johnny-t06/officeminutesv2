import OfficeHourWrapper from "@/app/components/OfficeHourWrapper";
import OfficeHourProvider from "@/app/context/OfficeHourContext";
import React from "react";
interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  return (
    <OfficeHourProvider courseId={courseId}>
      <OfficeHourWrapper />;
    </OfficeHourProvider>
  );
};

export default Page;
