import { db } from "../../../../firebase";
import { Question } from "@interfaces/db";
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
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { IdentifiableQuestion, IdentifiableQuestions } from "@interfaces/type";

type AddQuestion = Pick<
  Question,
  "title" | "description" | "questionPublic" | "group" | "tags"
> &
  PartialWithFieldValue<Question>;

export const addQuestion = async (question: AddQuestion, courseId: string) => {
  const questionsColection: CollectionReference = collection(
    db,
    `courses/${courseId}/questions`
  ).withConverter(questionConverter);
  const questionDoc = await addDoc(questionsColection, {
    ...question,
    timestamp: serverTimestamp(),
  });
  return { id: questionDoc.id, ...question } as IdentifiableQuestion;
};

export const updateQuestion = async (
  question: IdentifiableQuestion,
  courseId: string
) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${question.id}`
  ).withConverter(questionConverter);

  const { id, ...res } = question;
  if (res.group.length === 0) {
    await deleteDoc(questionDoc);
  } else {
    await updateDoc(questionDoc, res);
  }

  return question;
};

export const joinQuestionGroup = async (
  question: IdentifiableQuestion,
  courseId: string,
  userId: string
) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${question.id}`
  ).withConverter(questionConverter);

  await updateDoc(questionDoc, {
    group: arrayUnion(userId),
  });
  return { ...question, group: [...question.group, userId] };
};

export const leaveQuestionGroup = async (
  question: IdentifiableQuestion,
  courseId: string,
  userId: string
) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${question.id}`
  ).withConverter(questionConverter);

  await updateDoc(questionDoc, {
    group: arrayRemove(userId),
  });
  return { ...question, group: question.group.filter((id) => id !== userId) };
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
  const questionsDocs: IdentifiableQuestions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return questionsDocs;
};

export const deleteQuestion = async (courseId: string, questionId: string) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${questionId}`
  ).withConverter(questionConverter);

  await deleteDoc(questionDoc);
};
