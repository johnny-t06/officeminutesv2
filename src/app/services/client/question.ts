import { db } from "../../../../firebase";
import { Question, QuestionState } from "../../interfaces/db";
import { questionConverter } from "../firestore";
import {
  doc,
  DocumentReference,
  addDoc,
  collection,
  CollectionReference,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";

export const addQuestion = async (question: Question, courseId: string) => {
  try {
    const questionsColection: CollectionReference = collection(
      db,
      `courses/${courseId}/questions`
    ).withConverter(questionConverter);

    const newQuestion = {
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
