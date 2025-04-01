import {
  collection,
  deleteDoc,
  doc,
  documentId,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
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
  if (userID === "") {
    return null;
  }
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
  if (userIds.length === 0) {
    return [];
  }

  const chunks = [];
  const chunkSize = 30;

  for (let i = 0; i < userIds.length; i += chunkSize) {
    chunks.push(userIds.slice(i, i + chunkSize));
  }

  const userPromises = chunks.map(async (chunk) => {
    const q = query(
      collection(db, "users").withConverter(userConverter),
      where(documentId(), "in", chunk)
    );
    const users = await getDocs(q);
    return users.docs
      .filter((doc) => doc.exists())
      .map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  const userChunks = await Promise.all(userPromises);
  const fetchedUsers = userChunks.flat();
  const userMap = new Map(fetchedUsers.map((user) => [user.id, user]));
  const sortedUsers = userIds
    .map((id) => userMap.get(id))
    .filter((user) => user !== undefined) as IdentifiableUsers;
  return sortedUsers;
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
