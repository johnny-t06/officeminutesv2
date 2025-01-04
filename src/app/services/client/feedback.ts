import { IdentifiableFeedback, IdentifiableFeedbacks } from "@interfaces/type";
import { db } from "@project/firebase";
import { feedbackConverter } from "../firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Feedback } from "@interfaces/db";

export const addFeedback = async (feedback: Feedback) => {
  const feedbackCollection = collection(db, "feedback").withConverter(
    feedbackConverter
  );

  await addDoc(feedbackCollection, feedback);
};

export const updateFeedback = async (feedback: IdentifiableFeedback) => {
  const feedbackDoc = doc(db, `feedback/${feedback.id}`).withConverter(
    feedbackConverter
  );

  const { id, ...res } = feedback;

  await updateDoc(feedbackDoc, res);
  return feedback;
};

export const getFeedback = async (feedbackID: string) => {
  const feedbackDoc = await getDoc(
    doc(db, `feedback/${feedbackID}`).withConverter(feedbackConverter)
  );
  return { id: feedbackID, ...feedbackDoc.data() } as IdentifiableFeedback;
};

export const getFeedbacks = async () => {
  const snapshot = await getDocs(
    collection(db, `feedback`).withConverter(feedbackConverter)
  );
  const feedbackDocs: IdentifiableFeedbacks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return feedbackDocs;
};

export const deleteFeedback = async (feedbackID: string) => {
  const feedbackDoc = doc(db, `feedback/${feedbackID}`).withConverter(
    feedbackConverter
  );

  await deleteDoc(feedbackDoc);
};
