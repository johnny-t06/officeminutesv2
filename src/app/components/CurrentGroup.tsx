"use client";

import React, { useState } from "react";
import { trimName } from "../utils";
import { IdentifiableQuestion, IdentifiableUser } from "@interfaces/type";
import { getUser } from "@services/client/user";

interface Props {
  clickedConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  currQuestion: IdentifiableQuestion | undefined;
  currIndex: number | undefined;
}

export default function CurrentGroup({
  currQuestion,
  currIndex,
  clickedConfirm,
}: Props) {
  // const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
  // const [currIndex, setCurrIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState(false);
  const [hoverStyle2, setHoverStyle2] = useState(false);
  //   const [showConfirm, setShowConfirm] = useState(false);
  // const [found, setFound] = useState(false);
  const [group, setGroup] = useState<IdentifiableUser[]>([]);

  React.useEffect(() => {
    if (currQuestion) {
      const promises = currQuestion.group.map(async (studentID) =>
        getUser(studentID)
      );

      Promise.all(promises).then((data) =>
        setGroup(data.filter((x) => x !== null))
      );
    }
  }, []);

  const onHover = () => {
    setHoverStyle(!hoverStyle);
  };

  const onHover2 = () => {
    setHoverStyle2(!hoverStyle2);
  };

  const clickShowConfirm = () => {
    clickedConfirm(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        {currQuestion !== null ? (
          <>
            <div className="flex gap-x-2 w-full bg-[#EDF7ED] py-3 px-2.5 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M15.2075 6.94825L9.16665 12.9891L5.87581 9.70742L4.58331 10.9999L9.16665 15.5833L16.5 8.24992L15.2075 6.94825ZM11 1.83325C5.93998 1.83325 1.83331 5.93992 1.83331 10.9999C1.83331 16.0599 5.93998 20.1666 11 20.1666C16.06 20.1666 20.1666 16.0599 20.1666 10.9999C20.1666 5.93992 16.06 1.83325 11 1.83325ZM11 18.3333C6.94831 18.3333 3.66665 15.0516 3.66665 10.9999C3.66665 6.94825 6.94831 3.66659 11 3.66659C15.0516 3.66659 18.3333 6.94825 18.3333 10.9999C18.3333 15.0516 15.0516 18.3333 11 18.3333Z"
                  fill="#2E7D32"
                />
              </svg>
              You&apos;re in the Queue!
            </div>
            <div className="grid grid-cols-8">
              <div className="flex flex-col lg:col-span-3 col-span-8 items-center">
                <div className="font-bold text-5xl">
                  {currIndex !== undefined && currIndex + 1}
                </div>
                <div className="py-3 text-xs">On Queue</div>
              </div>
              <div className="flex gap-y-1 flex-col lg:col-span-5 col-span-8 text-center">
                <button
                  onMouseEnter={onHover}
                  onMouseLeave={onHover}
                  className={`text-sm px-2 py-2 rounded shadow-md ${
                    hoverStyle
                      ? "bg-[#1E88E5] text-white"
                      : "border-[#2196F3] border-2 text-[#2196F3]"
                  }`}
                >
                  EDIT SUBMISSION
                </button>
                <button
                  onMouseEnter={onHover2}
                  onMouseLeave={onHover2}
                  onClick={clickShowConfirm}
                  className={`text-sm px-2 py-2 rounded shadow-md ${
                    hoverStyle2
                      ? "bg-[#1E88E5] text-white"
                      : "border-[#2196F3] border-2 text-[#2196F3]"
                  }`}
                >
                  LEAVE QUEUE
                </button>
              </div>
            </div>
            {currQuestion?.public ? (
              <>
                <div className="w-full h-0.5 bg-[#0000001F]" />
                <div className="font-bold text-lg">{currQuestion?.title}:</div>
                {group.map((student, index) => (
                  <span className="font-normal text-base" key={index}>
                    {index + 1}. {trimName(student.name)}
                  </span>
                ))}
              </>
            ) : null}
            <div className="w-full h-0.5 bg-[#0000001F]" />
          </>
        ) : null}
      </div>
    </div>
  );
}
