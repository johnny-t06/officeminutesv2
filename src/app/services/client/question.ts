import { db } from "../../../../firebase";
import { Question, QuestionState } from "@interfaces/db";
import { questionConverter } from "../firestore";
import {
  doc,
  DocumentReference,
  addDoc,
  collection,
  CollectionReference,
  PartialWithFieldValue,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

type addQuestion = Pick<
  Question,
  "title" | "description" | "public" | "timestamp" | "group" | "tags"
> &
  PartialWithFieldValue<Question>;

export const addQuestion = async (question: addQuestion, courseId: string) => {
  try {
    const questionsColection: CollectionReference = collection(
      db,
      `courses/${courseId}/questions`
    ).withConverter(questionConverter);

    const newQuestion: addQuestion = {
      title: question.title,
      description: question.description,
      public: question.public,
      state: QuestionState.PENDING,
      timestamp: question.timestamp,
      group: question.group,
      tags: question.tags,
    };

    const questionDoc = await addDoc(questionsColection, newQuestion);
    console.log("New question added");

    return questionDoc;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (
  question: PartialWithFieldValue<Question>,
  courseId: string,
  questionId: string
) => {
  try {
    const questionDoc: DocumentReference = doc(
      db,
      `courses/${courseId}/questions/${questionId}`
    );

    const updatedDoc = await updateDoc(questionDoc, question);

    console.log("question updated");
    return updatedDoc;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (courseId: string, questionId: string) => {
  try {
    const questionDoc: DocumentReference = doc(
      db,
      `courses/${courseId}/questions/${questionId}`
    );

    console.log("Question: ", questionDoc.id);
    return questionDoc;
  } catch (error) {
    console.log("Error getting question", error);
  }
};

export const deleteQuestion = async (courseId: string, questionId: string) => {
  try {
    const questionDoc: DocumentReference = doc(
      db,
      `courses/${courseId}/questions/${questionId}`
    );

    await deleteDoc(questionDoc);
    console.log("Question deleted");
  } catch (error) {
    console.log("Error deleting question", error);
  }
};
