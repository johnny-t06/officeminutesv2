"use client";

import React from "react";

import { formatTimeDifference } from "../utils";
import { Button } from "@mui/material";
import { IdentifiableQuestion } from "@interfaces/type";
import { QuestionState } from "@interfaces/db";
import { getUser } from "@services/client/user";

interface QuestionPostProps {
  question: IdentifiableQuestion;
}

export const QuestionPost = (props: QuestionPostProps) => {
  const { question } = props;
  const [joined, setOnJoined] = React.useState(false);
  const [askedBy, setAskedBy] = React.useState<string>("");
  const status = question.state;

  React.useEffect(() => {
    const fetchAskedBy = async () => {
      const student = await getUser(question.group[0]);
      if (student) {
        setAskedBy(student.name);
      }
    };
    fetchAskedBy();
  }, [question.group]);
  const onClickJoin = () => {
    //Student joins public question post
    setOnJoined(!joined);
  };

  const style =
    status === QuestionState.PENDING
      ? ""
      : status === QuestionState.IN_PROGRESS
      ? "border-2 border-[#0288D1]"
      : "border-2 border-[#1E88E5]";

  return (
    <div
      className={`flex flex-col justify-between shadow-lg rounded-xl h-72 p-5 ${style}`}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <div className="font-bold text-2xl text-[#393939]">
            {question.title}
          </div>
          <div className="text-[#393939]">{askedBy}</div>
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
        <p className="max-h-32 overflow-auto">{props.question.description}</p>
        <div className="flex justify-end">
          <div className="text-[#393939] text-xs">
            {formatTimeDifference(question.timestamp)}
          </div>
        </div>
      </div>
      <div className="justify-center flex">
        {question && (
          <Button
            className={"w-full"}
            variant={joined ? "outlined" : "contained"}
            onClick={onClickJoin}
          >
            {joined ? "Joined" : "Join group"}{" "}
          </Button>
        )}
      </div>
    </div>
  );
};
