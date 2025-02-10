"use client";

import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export const useQuestionAccessCheck = (
  questionId: string,
  callbackUrl: string
) => {
  const router = useRouter();
  const user = useUserOrRedirect();
  const { course, questions } = useOfficeHour();
  const [isUserTA, setIsUserTA] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const question = useMemo(
    () => questions.find((q) => q.id === questionId),
    [questions, questionId]
  );

  useEffect(() => {
    if (!user || !course) {
      throw new Error();
    }

    if (
      !question ||
      (!question.questionPublic && !question.group.includes(user.id))
    ) {
      router.replace(callbackUrl);
      return;
    }

    setIsUserTA(course.tas.includes(user.id));
    setIsLoading(false);
  }, [user, course, question]);

  if (!question) {
    throw new Error();
  }

  return { isUserTA, question, isLoading };
};
