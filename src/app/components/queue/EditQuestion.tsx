"use client";

import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import { CustomModal } from "@components/CustomModal";
import { leaveQuestionGroup } from "@services/client/question";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { getUsers } from "@services/client/user";
import { useLoading } from "@context/LoadingContext";
import { QuestionState } from "@interfaces/db";
import { StudentHelping } from "./StudentHelping";
import { StudentMissing } from "./StudentMissing";
import { EditQuestionItem } from "./EditQuestionItem";

interface EditQuestionProps {
  queuePos: number;
  groupPos: number;
  currQuestion: IdentifiableQuestion;
  groupQuestion: IdentifiableQuestion;
}

export const EditQuestion = (props: EditQuestionProps) => {
  const { queuePos, groupPos, currQuestion, groupQuestion } = props;
  const { course } = useOfficeHour();
  const [tas, setTas] = React.useState<IdentifiableUsers>([]);
  const [leaveQueueModal, setLeaveQueueModal] = React.useState<boolean>(false);
  const { setLoading } = useLoading();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const tasData = await getUsers(course.tas);
      setTas(tasData);
      setLoading(false);
    };
    fetchData();
  }, [course]);

  const user = useUserOrRedirect();

  if (!user || tas.length === 0) {
    return null;
  }

  const leaveQueue = async () => {
    await leaveQuestionGroup(currQuestion, course.id, user.id);
    setLeaveQueueModal(false);
  };
  const leaveGroup = async () => {
    await leaveQuestionGroup(groupQuestion, course.id, user.id);
  };

  const leaveQueueButtons = [
    {
      text: "Stay",
      onClick: () => setLeaveQueueModal(false),
    },
    {
      text: "Leave",
      onClick: leaveQueue,
    },
  ];

  // not in queue, not join any question,
  // and not have any IN_PROGRESS or MISSING question
  if (queuePos === -1 && groupPos === -1 && currQuestion.title === "") {
    return null;
  }

  if (currQuestion.state === QuestionState.IN_PROGRESS) {
    const ta = tas.find((myTa) => myTa.id === currQuestion.helpedBy);
    return ta ? <StudentHelping currQuestion={currQuestion} ta={ta} /> : null;
  }

  if (currQuestion.state === QuestionState.MISSING) {
    return <StudentMissing currQuestion={currQuestion} />;
  }

  const questionsToDisplay = [];

  if (queuePos !== -1) {
    questionsToDisplay.push({
      position: queuePos,
      question: currQuestion,
      leaveQueue: () => setLeaveQueueModal(true),
    });
  }

  if (groupPos !== -1) {
    questionsToDisplay.push({
      position: groupPos,
      question: groupQuestion,
      leaveQueue: leaveGroup,
    });
  }

  questionsToDisplay.sort((a, b) => a.position - b.position);

  return (
    <React.Fragment>
      {!currQuestion.questionPublic && (
        <CustomModal
          title="Leave queue?"
          subtitle="You'll lose your place in line and won't receive assistance until you join again."
          buttons={leaveQueueButtons}
          open={leaveQueueModal}
          setOpen={setLeaveQueueModal}
        />
      )}

      {questionsToDisplay.map((item, index) => (
        <EditQuestionItem
          key={index}
          position={item.position}
          question={item.question}
          leaveQueue={item.leaveQueue}
        />
      ))}
    </React.Fragment>
  );
};
