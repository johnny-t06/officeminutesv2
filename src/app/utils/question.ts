import { db } from "../../../firebase";
import { Question, QuestionState } from "../types/db";
import { questionConverter } from "../services/firestore";
import {
  doc,
  DocumentReference,
  addDoc,
  collection,
  CollectionReference,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";

export const addQuestion = async (
  question: PartialWithFieldValue<Question>,
  courseId: string
) => {
  try {
    const questionsColection: CollectionReference = collection(
      db,
      `courses/${courseId}/questions`
    ).withConverter(questionConverter);

    const newQuestion = {
      title: question.title,
      id: "",
      description: question.description,
      public: question.public,
      state: QuestionState.Pending,
      timestamp: question.timestamp,
      group: question.group,
      tags: question.tags,
    };

    const questionDoc = await addDoc(questionsColection, newQuestion);

    const questionId = questionDoc.id;
    await updateDoc(questionDoc, { id: questionId });

    console.log("New question added");
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (
  question: PartialWithFieldValue<Question>,
  courseId: string,
  questionId: string
) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${questionId}`
  );

  await updateDoc(questionDoc, question);
};
