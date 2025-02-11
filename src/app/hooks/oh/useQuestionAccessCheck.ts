"use client";

import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getQuestion } from "@services/client/question";
import { IdentifiableQuestion } from "@interfaces/type";

export const useQuestionAccessCheck = (
  questionId: string,
  callbackUrl: string
) => {
  const router = useRouter();
  const user = useUserOrRedirect();
  const { course } = useOfficeHour();
  const [isUserTA, setIsUserTA] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<IdentifiableQuestion>();

  useEffect(() => {
    if (!user || !course) {
      return;
    }

    const fetchAndCheckQuestion = async () => {
      try {
        const foundQuestion = await getQuestion(course.id, questionId);

        if (
          !foundQuestion ||
          (!foundQuestion.questionPublic &&
            !foundQuestion.group.includes(user.id))
        ) {
          throw new Error();
        }

        setQuestion(foundQuestion);
        setIsUserTA(course.tas.includes(user.id));
        setIsLoading(false);
      } catch (error) {
        router.replace(callbackUrl);
      }
    };

    fetchAndCheckQuestion();
  }, [user, course, questionId]);

  return { isUserTA, question, isLoading };
};
