"use client";

import React, { useState } from "react";
import { type OfficeHour, Status, Question, Student } from "@/types";
import { trimName } from "../utils";

interface QuestionPostProps {
  question: OfficeHour["questions"][number];
  currQuestion: Question | null;
  student: Student;
}

export const QuestionPost = (props: QuestionPostProps) => {
  const [joined, setOnJoined] = React.useState(false);
  const { status } = props.question;

  const onClickJoin = () => {
    props.question.students.push(props.student);
    // Joined the queue of public question
    // ws.current?.emit("join_queue", props.question);
    setOnJoined(!joined);
  };

  console.log(props.question);
  const style =
    status === Status.WAITING
      ? ""
      : status === Status.IN_PROGRESS
      ? "border-2 border-[#0288D1]"
      : "border-2 border-[#1E88E5]";

  return (
    <div
      className={`flex flex-col justify-between shadow-question rounded-xl h-72 p-5 ${style}`}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <div className="font-bold text-2xl text-[#393939]">
            {props.question.question}
          </div>
          <div className="text-[#393939]">
            {props.question.students.length > 0
              ? trimName(props.question.students[0].name)
              : ""}
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
        <p className="max-h-32 overflow-scroll">{props.question.description}</p>
        <div className="flex justify-end">
          <div className="text-[#393939] text-xs">
            Asked at {props.question.time}
          </div>
        </div>
      </div>
      <div className="justify-center flex">
        {props.question != props.currQuestion && (
          <button
            className={`w-full uppercase py-4 text-sm rounded shadow-md ${
              joined
                ? "border-[#0288D1] border-2 text-[#0288D1]"
                : "bg-[#1E88E5] text-white"
            }`}
            onClick={onClickJoin}
          >
            {joined ? "Joined" : "Join group"}
          </button>
        )}
      </div>
      {/* {props.question && props.question.status == Status.IN_PROGRESS}
      <div className="bg-[#0288D1] text-white text-sm px-2 py-1 rounded-3xl items-center">
        In progress!
      </div> */}
      {/* <div className="justify-end">
        <button
          className={`w-full uppercase py-4 text-sm rounded shadow-md ${
            status === Status.WAITING
              ? "bg-[#1E88E5] text-white"
              : status === Status.IN_PROGRESS
              ? "border-[#0288D1] border-2 text-[#0288D1]"
              : "border-[#D32F2F] border-2 text-[#D32F2F]"
          }`}
        >
          {status === Status.WAITING
            ? "Start helping"
            : status === Status.IN_PROGRESS
            ? "Mark as done"
            : "Done"}
        </button>
      </div> */}
    </div>
  );
};
