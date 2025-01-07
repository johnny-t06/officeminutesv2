import { db } from "../../../../firebase";
import { IdentifiableCourse, IdentifiableCourses } from "@interfaces/type";
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
} from "firebase/firestore";

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

export const deleteCourse = async (courseID: String) => {
  const courseDoc = doc(db, `courses/${courseID}`).withConverter(
    courseConverter
  );

  await deleteDoc(courseDoc);
  console.log("Course deleted");
};
