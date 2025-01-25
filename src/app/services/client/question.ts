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
import { runTransaction } from "firebase/firestore";

/* Why not pass in a Question type */
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
    helpedAt: serverTimestamp(),
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

export const partialUpdateQuestion = async (
  questionId: string,
  courseId: string,
  question: PartialWithFieldValue<IdentifiableQuestion>
) => {
  const questionDoc: DocumentReference = doc(
    db,
    `courses/${courseId}/questions/${questionId}`
  ).withConverter(questionConverter);

  const { id, ...res } = question;
  if (Array.isArray(res.group) && res.group.length === 0) {
    await deleteDoc(questionDoc);
  } else {
    await updateDoc(questionDoc, { ...res });
  }
  // Difficult to return the updated question here without another read
  return;
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

  await runTransaction(db, async (transaction) => {
    const questionSnapshot = await transaction.get(questionDoc);

    if (!questionSnapshot.exists()) {
      return;
    }

    const currentGroup = questionSnapshot.data().group;

    if (currentGroup.length <= 1) {
      transaction.delete(questionDoc);
    } else {
      transaction.update(questionDoc, {
        group: arrayRemove(userId),
      });
    }
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
