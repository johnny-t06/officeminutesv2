import { db } from "../../../../firebase";
import { IdentifiableCourse, IdentifiableCourses } from "@interfaces/type";
import { courseConverter } from "../firestore";
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const addCourse = async (course: IdentifiableCourse) => {
  const courseDoc: DocumentReference = doc(
    db,
    `courses/${course.id}`
  ).withConverter(courseConverter);

  await setDoc(courseDoc, course);

  console.log("New course created: ");

  return course;
};

export const updateCourse = async (course: IdentifiableCourse) => {
  const courseDoc = doc(db, `courses/${course.id}`).withConverter(
    courseConverter
  );

  const { id, ...res } = course;

  await updateDoc(courseDoc, res);

  console.log("Course information updated");
  return course;
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

export const deleteCourse = async (courseID: String) => {
  const courseDoc = doc(db, `courses/${courseID}`).withConverter(
    courseConverter
  );

  await deleteDoc(courseDoc);
  console.log("Course deleted");
};
