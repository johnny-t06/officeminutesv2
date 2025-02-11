"use client";

import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getQuestion } from "@services/client/question";
import { IdentifiableQuestion } from "@interfaces/type";

export const useQuestionAccessCheck = (
  questionId: string,
  callbackUrl: string,
  expired: boolean = false
) => {
  const router = useRouter();
  const user = useUserOrRedirect();
  const { course, questions } = useOfficeHour();
  const [isUserTA, setIsUserTA] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<IdentifiableQuestion>();

  useEffect(() => {
    if (!user || !course) {
      return;
    }

    const fetchAndCheckQuestion = async () => {
      try {
        let foundQuestion: IdentifiableQuestion | undefined;
        if (expired) {
          foundQuestion = await getQuestion(course.id, questionId);
        } else {
          foundQuestion = questions.find((q) => q.id === questionId);
        }
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
