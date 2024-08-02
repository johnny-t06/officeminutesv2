import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { userConverter } from "@services/firestore";
import { IdentifiableUser } from "@interfaces/type";

export const addUser = async (user: IdentifiableUser) => {
  const userDoc: DocumentReference = doc(db, `users/${user.id}`).withConverter(
    userConverter
  );
  await setDoc(userDoc, user);
  return user;
};

export const getUser = async (userID: String) => {
  const userDoc = await getDoc(
    doc(db, `users/${userID}`).withConverter(userConverter)
  );
  return { id: userID, ...userDoc.data() } as IdentifiableUser;
};

export const updateUser = async (user: IdentifiableUser) => {
  const userDoc = doc(db, `users/${user.id}`).withConverter(userConverter);
  const { id, ...res } = user;
  await setDoc(userDoc, res);
  return user;
};

export const deleteUser = async (userID: String) => {
  const userDoc = doc(db, `users/${userID}`).withConverter(userConverter);
  await deleteDoc(userDoc);
};
