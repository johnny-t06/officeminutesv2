import { db } from "../../../../firebase";
import {
  IdentifiableCourse,
  IdentifiableCourses,
  IdentifiableUser,
} from "@interfaces/type";
import { courseConverter, userConverter } from "../firestore";
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  documentId,
  PartialWithFieldValue,
  writeBatch,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { Announcement } from "@interfaces/db";

export const addCourse = async (course: IdentifiableCourse) => {
  const courseDoc: DocumentReference = doc(
    db,
    `courses/${course.id}`
  ).withConverter(courseConverter);

  await setDoc(courseDoc, course);

  return course;
};

export const updateCourse = async (course: IdentifiableCourse) => {
  const courseDoc = doc(db, `courses/${course.id}`).withConverter(
    courseConverter
  );

  const { id, ...res } = course;

  await updateDoc(courseDoc, res);

  return course;
};

export const joinCourse = async (courseId: string, userId: string) => {
  const batch = writeBatch(db);

  const courseDoc = doc(db, `courses/${courseId}`).withConverter(
    courseConverter
  );
  batch.update(courseDoc, {
    students: arrayUnion(userId),
  });

  const userDoc = doc(db, `users/${userId}`).withConverter(userConverter);
  batch.update(userDoc, {
    courses: arrayUnion(courseId),
  });

  await batch.commit();

  return;
};

export const partialUpdateCourse = async (
  courseId: string,
  data: PartialWithFieldValue<IdentifiableCourse>
) => {
  const courseDoc = doc(db, `courses/${courseId}`).withConverter(
    courseConverter
  );

  await updateDoc(courseDoc, data);

  return courseId;
};

/*
Can't populate createdAt field with serverTimestamp because announcments
is a list. Optimistically rely on client (tas) time for now.
*/
export const addCourseAnnouncement = async (
  courseId: string,
  announcement: Announcement
) => {
  const courseDoc = doc(db, `courses/${courseId}`).withConverter(
    courseConverter
  );

  await updateDoc(courseDoc, {
    announcements: arrayUnion(announcement),
  });
  return;
};

/* Remove and re-add announcement to list for race safety */
export const editCourseAnnouncement = async (
  courseId: string,
  oldAnnouncement: Announcement,
  newAnnouncement: Announcement
) => {
  if (oldAnnouncement.message === newAnnouncement.message) {
    return;
  }
  const courseDoc = doc(db, `courses/${courseId}`).withConverter(
    courseConverter
  );
  const batch = writeBatch(db);
  batch.update(courseDoc, {
    announcements: arrayRemove(oldAnnouncement),
  });
  batch.update(courseDoc, {
    announcements: arrayUnion(newAnnouncement),
  });
  await batch.commit();

  return;
};

export const deleteCourseAnnouncement = async (
  courseId: string,
  announcement: Announcement
) => {
  const courseDoc = doc(db, `courses/${courseId}`).withConverter(
    courseConverter
  );

  await updateDoc(courseDoc, {
    announcements: arrayRemove(announcement),
  });

  return;
};

export const getCourse = async (courseID: String) => {
  const courseDoc = await getDoc(
    doc(db, `courses/${courseID}`).withConverter(courseConverter)
  );
  return { id: courseID, ...courseDoc.data() } as IdentifiableCourse;
};

export const getCourses = async () => {
  const snapshot = await getDocs(
    collection(db, `courses`).withConverter(courseConverter)
  );
  const coursesDocs: IdentifiableCourses = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return coursesDocs;
};

export const getUserCourses = async (user: IdentifiableUser) => {
  const coursesQuery = query(
    collection(db, "courses"),
    where(documentId(), "in", user.courses)
  );

  const snapshot = await getDocs(coursesQuery.withConverter(courseConverter));

  const coursesDocs: IdentifiableCourse[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return coursesDocs;
};

export const getCoursesByIds = async (
  courseIds: string[]
): Promise<IdentifiableCourse[]> => {
  const coursesQuery = query(
    collection(db, "courses"),
    where(documentId(), "in", courseIds)
  );

  const snapshot = await getDocs(coursesQuery.withConverter(courseConverter));

  const coursesDocs: IdentifiableCourse[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return coursesDocs;
};

export const getCourseByCode = async (code: String) => {
  const courseQuery = query(
    collection(db, `courses`).withConverter(courseConverter),
    where("code", "==", code)
  );

  const snapshot = await getDocs(courseQuery);

  if (snapshot.docs.length === 0) {
    return null;
  }

  const courseDoc = snapshot.docs[0];

  return { id: courseDoc.id, ...courseDoc.data() } as IdentifiableCourse;
};

export const deleteCourse = async (courseID: String) => {
  const courseDoc = doc(db, `courses/${courseID}`).withConverter(
    courseConverter
  );

  await deleteDoc(courseDoc);
};

export const addCourseTag = async (courseID: String, tag: String) => {
  const courseDoc = doc(db, `courses/${courseID}`).withConverter(
    courseConverter
  );

  await updateDoc(courseDoc, {
    "tags.Tags.options": arrayUnion({
      choice: tag,
    }),
  });
};

export const deleteCourseTag = async (courseID: string, tagName: string) => {
  const courseDoc = doc(db, `courses/${courseID}`).withConverter(
    courseConverter
  );

  await updateDoc(courseDoc, {
    "tags.Tags.options": arrayRemove({
      choice: tagName,
    }),
  });
};
