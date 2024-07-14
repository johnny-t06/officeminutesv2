import React, { Dispatch, SetStateAction, useState } from "react";
import { type OfficeHour, type Student, type Question, Status } from "@/types";
import TagsSelector from "./TagsSelector";
import TextField from "./TextField";
import Checkbox from "./Checkbox";

interface ModalProps {
  // ws: any;
  state: OfficeHour;
  showModal: boolean;
  student: Student;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface ModalStageOneProps {
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
  state: OfficeHour;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  generalTagIndex: number;
  setGeneralTagIndex: Dispatch<SetStateAction<number>>;
  generalTags: string[];
  issueTags: string[];
  feelingTags: string[];
}

interface ModalStageTwoProps {
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
  // ws: any;
  state: OfficeHour;
  tagIndex: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  feelingTags: string[];
}

const StageOneModal = ({
  question,
  setQuestion,
  state,
  stage,
  setStage,
  setShowModal,
  generalTagIndex,
  setGeneralTagIndex,
  generalTags,
  issueTags,
  feelingTags,
}: ModalStageOneProps) => {
  const handleStageChange = () => {
    if (stage === 2) {
      setStage(1);
    } else {
      setStage(stage + 1);
    }
  };

  return (
    <div className="flex absolute left-0 top-0 z-50 w-full h-full items-center justify-center text-left">
      <div className="p-6 bg-white flex flex-col shadow-2xl rounded-lg gap-6 w-[650px]">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="text-base font-bold">Join Queue</span>
            <button onClick={() => setShowModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#393939"
                />
              </svg>
            </button>
          </div>
          <span className="text-2xl font-bold mt-2.5">
            What do you need help with?
          </span>
        </div>

        <div className="flex flex-col">
          <TagsSelector
            tags={generalTags}
            title="General*"
            question={question}
            setQuestion={setQuestion}
            setTagIndex={setGeneralTagIndex}
          />
        </div>

        <div className="flex flex-col">
          <TagsSelector
            tags={issueTags}
            title="Issues (if applicable)"
            question={question}
            setQuestion={setQuestion}
          />
        </div>

        <div className="flex flex-col">
          {generalTagIndex === 2 ? (
            <TagsSelector
              // tags={state.tas.map((ta) => ta.name)}
              tags={["tag1", "tag2", "tag3"]}
              title="Who did you receive help from?"
              question={question}
              setQuestion={setQuestion}
            />
          ) : (
            <TagsSelector
              tags={feelingTags}
              title="How do you feel about this topic?"
              question={question}
              setQuestion={setQuestion}
            />
          )}
        </div>

        <button
          className="px-5 py-2 mt-8 w-full rounded-[4px] text-sm bg-primary text-white hover:bg-gray-300 hover:text-gray-500"
          onClick={() => handleStageChange()}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

const StageTwoSubmitModal = ({
  question,
  setQuestion,
  // ws,
  state,
  tagIndex,
  setShowModal,
  feelingTags,
}: ModalStageTwoProps) => {
  const [questionText, setQuestionText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [isGroup, setIsGroup] = useState<boolean>(false);

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionText(event.target.value);
  };

  const handleQuestionUpdate = () => {
    const updatedQuestion = { ...question };

    if (questionText === "" || descriptionText === "") {
      alert("Please fill out the required fields");
    } else {
      updatedQuestion.question = questionText;
      updatedQuestion.description = descriptionText;
      updatedQuestion.private = !isGroup;
      setQuestion(updatedQuestion);

      //Joined Queue
      // ws.current?.emit("join_queue", updatedQuestion);

      setShowModal(false);
    }
  };

  const onChecked = () => {
    setIsGroup(!isGroup);
  };

  return (
    <div className="flex absolute left-0 top-0 z-50 w-full h-full items-center justify-center text-left">
      <div className="p-6 bg-white flex flex-col shadow-2xl rounded-lg gap-6 w-[650px]">
        <div className="flex flex-row justify-between">
          <span className="text-base font-bold">Join Queue</span>
          <button onClick={() => setShowModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#393939"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col">
          <span className="text-base font-normal">Problem Title*</span>
          <TextField
            value={questionText}
            onChange={handleQuestionChange}
            placeholder="Explain your problem in less than 5 words"
            required={true}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base font-normal">
            Add problem description*
          </span>
          <TextField
            value={descriptionText}
            onChange={handleDescriptionChange}
            placeholder="Tell us what you want to go over during the session"
            required={true}
          />
        </div>

        <div className="flex flex-row">
          <Checkbox checked={isGroup} onChange={onChecked} />
          <div className="flex flex-col ml-2.5">
            <span className="text-base font-normal">Make question public</span>
            <span className=" text-xs font-normal text-gray-500 mt-1">
              Your question will be posted on the Group Question Board. This
              will allow up to 5 people to join your TA session if they have
              similar questions. Your queue name will be your Problem Title.{" "}
            </span>
          </div>
        </div>

        <button
          className="px-5 py-2 mt-8 w-full rounded-[4px] text-white bg-primary text-sm hover:bg-gray-300 hover:text-black"
          onClick={() => {
            handleQuestionUpdate();
            // ws.current?.emit("join_queue", question);
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const StageTwoFollowUpModal = ({
  question,
  setQuestion,
  // ws,
  state,
  tagIndex,
  setShowModal,
  feelingTags,
}: ModalStageTwoProps) => {
  const [questionText, setQuestionText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionText(event.target.value);
  };

  const handleQuestionUpdate = () => {
    const updatedQuestion = { ...question };

    if (questionText === "" || descriptionText === "") {
      alert("Please fill out the required fields");
    } else {
      updatedQuestion.question = questionText;
      updatedQuestion.description = descriptionText;
      updatedQuestion.private = question.private;

      setQuestion(updatedQuestion);

      // Update the question in the queue
      // ws.current?.emit("join_queue", updatedQuestion);

      setShowModal(false);
    }
  };

  return (
    <div className="flex absolute left-0 top-0 z-50 w-full h-full items-center justify-center text-left">
      <div className="p-6 bg-white flex flex-col shadow-2xl rounded-lg gap-6 w-[650px]">
        <div className="flex flex-row justify-between">
          <span className="text-base font-bold">Join Queue</span>
          <button onClick={() => setShowModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#393939"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col">
          <TagsSelector
            tags={feelingTags}
            title="How do you feel about this topic now?*"
            question={question}
            setQuestion={setQuestion}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base font-normal">Problem Title*</span>
          <TextField
            value={questionText}
            onChange={handleQuestionChange}
            placeholder="Explain your problem in less than 5 words"
            required={true}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base font-normal">
            Add problem description*
          </span>
          <TextField
            value={descriptionText}
            onChange={handleDescriptionChange}
            placeholder="Tell us what you want to go over during the session"
            required={true}
          />
        </div>

        <button
          className="px-5 py-2 mt-8 w-full rounded-[4px] text-white bg-primary text-sm hover:bg-gray-300 hover:text-black"
          onClick={() => {
            handleQuestionUpdate();
            // ws.current?.emit("join_queue", question);
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const JoinModal = ({
  // ws,
  state,
  showModal,
  setShowModal,
  student,
}: ModalProps) => {
  const options = { timeZone: "America/New_York" };
  const [stage, setStage] = useState<number>(1);
  const [generalTagIndex, setGeneralTagIndex] = useState<number>(-1);
  const [isError, setIsError] = useState<boolean>(false);
  // @TODO: fetch server-side from course
  const generalTags = ["HW Help", "Conceptual Help", "Follow-up Question"];
  const issueTags = ["Proof Writing", "Master Method", "Induction", "Big O"];
  const feelingTags = [
    "Good - I have a quick question",
    "Confused - I need some help",
    "I'm lost (that's okay)",
  ];
  const [question, setQuestion] = useState<Question>({
    question: "",
    tags: [],
    students: [student],
    description: "",
    private: false,
    status: Status.WAITING,
    time: new Date(Date.now()).toLocaleTimeString("en-US", options),
  });

  return (
    <>
      {showModal && stage === 1 && (
        <StageOneModal
          question={question}
          setQuestion={setQuestion}
          state={state}
          stage={stage}
          setStage={setStage}
          setShowModal={setShowModal}
          generalTagIndex={generalTagIndex}
          setGeneralTagIndex={setGeneralTagIndex}
          generalTags={generalTags}
          issueTags={issueTags}
          feelingTags={feelingTags}
        />
      )}
      {/* @TODO */}
      {showModal && stage === 2 && generalTagIndex !== 2 && (
        <StageTwoSubmitModal
          question={question}
          setQuestion={setQuestion}
          // ws={ws}
          state={state}
          tagIndex={generalTagIndex}
          setShowModal={setShowModal}
          feelingTags={feelingTags}
        />
      )}
      {showModal && stage === 2 && generalTagIndex === 2 && (
        <StageTwoFollowUpModal
          question={question}
          setQuestion={setQuestion}
          // ws={ws}
          state={state}
          tagIndex={generalTagIndex}
          setShowModal={setShowModal}
          feelingTags={feelingTags}
        />
      )}
    </>
  );
};

export default JoinModal;
