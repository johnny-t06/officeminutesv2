"use client";

import React from "react";
import { type OfficeHour, Question, Status, Student } from "@/types";
import Queue from "./Queue";
import { TAQuestionPost } from "./TAQuestionPost";
import { Header } from "./Header";
import JoinModal from "./JoinModal";
import CurrentGroup from "./CurrentGroup";
// import { connect } from "socket.io-client";
// import { Session } from "next-auth";

const STATE: OfficeHour = {
  questions: [
    {
      question: "Fibonacci Heaps",
      tags: ["HW Help", "Bro Help"],
      students: [
        {
          name: "Won Kim",
          id: "",
        },

        {
          name: "Won Kim",
          id: "",
        },
      ],
      description:
        "Could someone explain why node 17 becomes the child of 15? I understand that we cannot have 2 trees with degree 2, but I was inclined to make 20 the child of 15.",
      private: false,
      status: Status.IN_PROGRESS,
      time: "4:44pm",
    },
    {
      question: "Kruskal's Runtime",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Johnny Tan",
          id: "",
        },
      ],
      description: "I love math",
      private: true,
      status: Status.WAITING,
      time: "3:33pm",
    },
    {
      question: "Recursion Tree",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Fa Taepaisitphongse",
          id: "",
        },
        {
          name: "Won Kim",
          id: "",
        },
        {
          name: "Jack Zhang",
          id: "65d178ab07173f4ac5868a46",
        },
      ],
      description: "I love alcohol",
      private: false,
      status: Status.DONE,
      time: "2:22pm",
    },
  ],
  location: "JCC 3rd Floor",
  tas: [
    {
      name: "Nick Doan",
      id: "",
    },
    {
      name: "Jack Zhang",
      id: "",
    },
  ],
};

interface OfficeHourProps {}

const TaOfficeHour = (props: OfficeHourProps) => {
  // Hard Code students
  const student: Student = {
    name: "Won Kim",
    id: "",
  };

  //Hard Code course
  const course = {
    code: "CS 170",
  };
  const [officeHourState, setOfficeHourState] =
    React.useState<OfficeHour | null>(STATE);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (buttonRef.current !== null && student !== null) {
      (buttonRef.current as any).click();
    }
  }, [buttonRef, student]);

  // React.useEffect(() => {
  //   console.log(state);
  //   if (state !== null) {
  //     setOfficeHourState(state);
  //   }
  // }, [state]);

  // React.useEffect(() => {
  //   if (student !== null) {
  //     console.log("student", student);
  //     console.log(ws.current);
  //     ws.current?.emit("add_ta", student);
  //   }
  // }, [student, ws]);

  if (officeHourState === null) {
    return <></>;
  }

  return (
    <div className="h-full w-full relative">
      <button
        className="hidden"
        onClick={() => {
          // Add TA to the office hour
        }}
        ref={buttonRef}
      />
      <Header
        headerLeft={
          <div className="text-4xl font-bold">
            {course.code.toUpperCase()} Office Hours
          </div>
        }
      />
      <div className="h-full w-full lg:grid lg:grid-cols-12 lg:pl-12 lg:pr-4 px-4">
        <div className="lg:col-span-9 col-span-12 flex flex-col gap-y-4 py-6 pr-3">
          <div className="grid grid-cols-12">
            <div className="lg:col-span-2 col-span-3 font-bold font-xl">
              TAs on Duty
            </div>
            <div className="flex gap-x-2.5 lg:col-span-10 col-span-9">
              {officeHourState.tas.map((ta, idx) => (
                <span key={idx}>{ta.name}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-2 col-span-3 font-bold font-xl">
              Location(s)
            </div>
            <div className="flex gap-x-2.5 lg:col-span-10 col-span-9">
              JCC 4th Floor Huddle Room
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-2 col-span-3 font-bold font-xl">
              Hours
            </div>
            <div className="flex gap-x-2.5 lg:col-span-10 col-span-9">
              6PM - 9PM
            </div>
          </div>

          <div className="w-full h-0.5 bg-[#0000001F]" />

          <div className="flex justify-between">
            <div className="font-bold text-3xl text-[#393939]">
              Queue ({officeHourState.questions.length} People)
            </div>
          </div>
          <div className="h-full grid grid-cols-1 gap-6">
            {officeHourState.questions.map((question: Question, idx) => (
              <div key={`${question.question}-${idx}`} className="col-span-1">
                <TAQuestionPost question={question} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 h-full w-full border-l-2 sticky overflow-x-hidden overflow-y-scroll px-6 py-8">
          <Queue state={officeHourState} />
        </div>
      </div>
    </div>
  );
};

export default TaOfficeHour;
