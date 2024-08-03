"use client";

import React from "react";
import Filler from "@/images/filler.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IdentifiableCourse } from "@interfaces/type";
import { Button } from "@mui/material";

interface CourseSelection {
  course: IdentifiableCourse;
}

const CourseSelection = ({ course }: CourseSelection) => {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push(`/course/${course.id}`)}>
        <div className="h-32 w-96 shadow-tile rounded-lg p-5 flex gap-x-4 cursor-pointer">
          <Image
            className="rounded-lg"
            width={80}
            height={80}
            alt="Filler Image"
            src={Filler.src}
          />

          <div className="flex flex-col gap-y-2.5">
            <h2 className="text-lg text-[#393939] uppercase">{course.id}</h2>
            <span className="text-[#393939]">{course.name}</span>
          </div>
        </div>
      </Button>
    </>
  );
};

export default CourseSelection;
