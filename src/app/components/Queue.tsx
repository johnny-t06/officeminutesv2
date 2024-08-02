import React from "react";
import { type OfficeHour, Status } from "../../../types";
import { trimName } from "../utils";
import { IdentifiableQuestions } from "@interfaces/type";

interface Props {
  questions: IdentifiableQuestions;
}

export default function Queue({ questions }: Props) {
  const now = Date.now();

  return (
    <div className="flex flex-col gap-3 py-3 ">
      <div className="flex flex-row justify-between text-center items-center">
        <span className="font-bold text-2xl">Queue</span>
        <span className=" font-medium text-[#BDBDBD] text-sm leading-6">
          As of {new Date(now).toISOString().split("T")[0]}
        </span>
      </div>
      {questions.map((question, index) => (
        <span className="font-normal text-base" key={index}>
          {index + 1}. {question.public ? question.title : question.group[0]}
        </span>
      ))}
    </div>
  );
}
