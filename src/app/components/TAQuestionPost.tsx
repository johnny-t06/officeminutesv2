"use client";

import React from "react";
import { type OfficeHour, Status } from "@/types";
import { Button } from "@mui/material";

interface QuestionPostProps {
  question: OfficeHour["questions"][number];
}

export const TAQuestionPost = (props: QuestionPostProps) => {
  return (
    <div className="flex flex-col justify-between shadow-lg rounded-xl h-70 p-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <div className="font-bold text-2xl text-[#393939]">
            {props.question.question}
          </div>
          <div className="text-[#393939]">
            {props.question.students.length > 0 &&
              props.question.students[0].name}
          </div>
        </div>

        <div className="flex gap-2">
          {props.question.tags.map((tag, idx) => (
            <div
              key={idx}
              className="bg-[#0288D1] text-white text-sm px-2 py-1 rounded-3xl items-center"
            >
              <span key={idx}> {tag} </span>
            </div>
          ))}
        </div>
        <p className="max-h-32 overflow-auto">{props.question.description}</p>
        <div className="flex justify-end">
          <div className="text-[#393939] text-xs pb-3">
            Asked at {props.question.time}
          </div>
        </div>
      </div>
      {!props.question.private && (
        <div className="flex flex-col py-3">
          <div className="w-full h-0.5 bg-[#0000001F]" />
          <div className="flex flex-col py-3">
            {props.question.students.map((Student, index) => (
              <span className="font-normal text-base py-1" key={index}>
                {index + 1}. {Student.name}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="justify-end">
        {/* <button
          className={`w-full uppercase py-4 text-sm rounded shadow-md ${
            props.question.status === Status.WAITING
              ? "bg-[#1E88E5] text-white"
              : props.question.status === Status.IN_PROGRESS
              ? "border-[#0288D1] border-2 text-[#0288D1]"
              : "border-[#D32F2F] border-2 text-[#D32F2F]"
          }`}
          //   onClick={
          //     props.question.status === Status.WAITING
          //       ? onStart
          //       : props.question.status === Status.IN_PROGRESS
          //       ? onDone
          //       : () => {}
          //   }
        >
          {props.question.status === Status.WAITING
            ? "Start helping"
            : props.question.status === Status.IN_PROGRESS
            ? "Mark as done"
            : "Done"}
        </button> */}
        <Button
          variant={
            props.question.status === Status.WAITING ? "contained" : "outlined"
          }
          className="w-full"
        >
          {" "}
          {props.question.status === Status.WAITING
            ? "Start helping"
            : props.question.status === Status.IN_PROGRESS
            ? "Mark as done"
            : "Done"}
        </Button>
      </div>
    </div>
  );
};
