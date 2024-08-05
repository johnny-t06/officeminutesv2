"use client";

import React from "react";
import { Button } from "@mui/material";
import { IdentifiableQuestion } from "@interfaces/type";
import { QuestionState } from "@interfaces/db";
import { formatTimeDifference } from "@utils/index";

interface QuestionPostProps {
  question: IdentifiableQuestion;
}

export const TAQuestionPost = (props: QuestionPostProps) => {
  const { question } = props;
  return (
    <div className="flex flex-col justify-between shadow-lg rounded-xl h-70 p-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <div className="font-bold text-2xl text-[#393939]">
            {question.title}
          </div>
          <div className="text-[#393939]">
            {question.group.length > 0 && question.group[0]}
          </div>
        </div>

        <div className="flex gap-2">
          {question.tags.map((tag, idx) => (
            <div
              key={idx}
              className="bg-[#0288D1] text-white text-sm px-2 py-1 rounded-3xl items-center"
            >
              <span key={idx}> {tag.choice} </span>
            </div>
          ))}
        </div>
        <p className="max-h-32 overflow-auto">{question.description}</p>
        <div className="flex justify-end">
          <div className="text-[#393939] text-xs pb-3">
            {formatTimeDifference(question.timestamp)}
          </div>
        </div>
      </div>
      {question.public && (
        <div className="flex flex-col py-3">
          <div className="w-full h-0.5 bg-[#0000001F]" />
          <div className="flex flex-col py-3">
            {question.group.map((student, index) => (
              <span className="font-normal text-base py-1" key={index}>
                {index + 1}. {student}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="justify-end">
        <Button
          variant={
            question.state === QuestionState.PENDING ? "contained" : "outlined"
          }
          className="w-full"
        >
          {" "}
          {question.state === QuestionState.PENDING
            ? "Start helping"
            : question.state === QuestionState.IN_PROGRESS
            ? "Mark as done"
            : "Done"}
        </Button>
      </div>
    </div>
  );
};
