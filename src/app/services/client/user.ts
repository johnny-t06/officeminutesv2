import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@project/firebase";
import { userConverter } from "@services/firestore";
import { IdentifiableUser, IdentifiableUsers } from "@interfaces/type";

export const addUser = async (user: IdentifiableUser) => {
  const userDoc: DocumentReference = doc(db, `users/${user.id}`).withConverter(
    userConverter
  );
  await setDoc(userDoc, user);
  return user;
};

export const getUser = async (
  userID: string
): Promise<IdentifiableUser | null> => {
  try {
    const userDoc = await getDoc(
      doc(db, `users/${userID}`).withConverter(userConverter)
    );
    if (!userDoc.exists()) {
      return null;
    }
    return { id: userID, ...userDoc.data() } as IdentifiableUser;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const getUsers = async (
  userIds: string[]
): Promise<IdentifiableUsers> => {
  const users = await Promise.all(userIds.map((id) => getUser(id)));
  return users.filter((user) => user !== null) as IdentifiableUsers;
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
