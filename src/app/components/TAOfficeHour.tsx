"use client";

import React, { useContext, useEffect, useState } from "react";
import { type OfficeHour, Question, Status, Student } from "../../../types";
import Queue from "./Queue";
import { TAQuestionPost } from "./TAQuestionPost";
import { Header } from "./Header";
import JoinModal from "./JoinModal";
import CurrentGroup from "./CurrentGroup";
import { IdentifiableQuestion, IdentifiableUser } from "@interfaces/type";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { getUser } from "@services/client/user";
import { compareQuestions } from "@utils/index";

interface OfficeHourProps {}

const TaOfficeHour = (props: OfficeHourProps) => {
  const { course, questions } = useOfficeHour();
  const [onDuty, setOnDuty] = useState<IdentifiableUser[]>([]);

  const [questionsByTime, setQuestionsByTime] = useState<
    IdentifiableQuestion[]
  >([]);

  useEffect(() => {
    const fetchOnDuty = async () => {
      try {
        const promises = course.onDuty.map(async (onDuty) => getUser(onDuty));
        const data = await Promise.all(promises);
        setOnDuty(data);
      } catch (e) {
        throw e;
      }
    };
    fetchOnDuty();
  }, [course.onDuty]);

  useEffect(() => {
    const questionsByTime = questions.sort(compareQuestions);
    setQuestionsByTime(questionsByTime);
  }, []);

  return (
    <div className="h-full w-full relative">
      <button
        className="hidden"
        onClick={() => {
          // Add TA to the office hour
        }}
      />
      <Header
        headerLeft={
          <div className="text-4xl font-bold">
            {course.id.toUpperCase()} Office Hours
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
              {onDuty.map((ta, idx) => (
                //remove the nullary once out of dev
                <span key={idx}>{ta.name ?? course.onDuty[idx]}</span>
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
              Queue ({questionsByTime.length} People)
            </div>
          </div>
          <div className="h-full grid grid-cols-1 gap-6">
            {questionsByTime.map((question: IdentifiableQuestion, idx) => (
              <div key={`${question.title}-${idx}`} className="col-span-1">
                <TAQuestionPost question={question} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 h-full w-full border-l-2 sticky overflow-x-hidden overflow-y-scroll px-6 py-8">
          <Queue questions={questionsByTime} />
        </div>
      </div>
    </div>
  );
};

export default TaOfficeHour;
