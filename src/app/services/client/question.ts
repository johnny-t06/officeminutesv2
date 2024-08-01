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
  getDoc,
  getDocs,
} from "firebase/firestore";
import { IdentifiableQuestion, IdentifiableQuestions } from "@interfaces/type";

type addQuestion = Pick<
  Question,
  "title" | "description" | "public" | "timestamp" | "group" | "tags"
> &
  PartialWithFieldValue<Question>;

export const addQuestion = async (question: addQuestion, courseId: string) => {
  const questionsColection: CollectionReference = collection(
    db,
    `courses/${courseId}/questions`
  ).withConverter(questionConverter);

  const questionDoc = await addDoc(questionsColection, question);

  return { id: questionDoc.id, ...question } as IdentifiableQuestion;
};

export const updateQuestion = async (
  question: IdentifiableQuestion,
  courseId: string
  // questionId: string
) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${question.id}`
  ).withConverter(questionConverter);

  const { id, ...res } = question;

  const updatedDoc = await updateDoc(questionDoc, res);

  return question;
};

export const getQuestion = async (courseId: string, questionId: string) => {
  const questionDoc = await getDoc(
    doc(db, `courses/${courseId}/questions/${questionId}`).withConverter(
      questionConverter
    )
  );

  return { id: questionDoc.id, ...questionDoc.data() } as IdentifiableQuestion;
};

export const getQuestions = async (courseId: string) => {
  const snapshot = await getDocs(
    collection(db, `courses/${courseId}/questions`).withConverter(
      questionConverter
    )
  );
  const questionsDocs: IdentifiableQuestions = snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as IdentifiableQuestion)
  );

  return questionsDocs;
};

export const deleteQuestion = async (courseId: string, questionId: string) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${questionId}`
  ).withConverter(questionConverter);

  await deleteDoc(questionDoc);
};
