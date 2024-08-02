import { db } from "../../../../firebase";
import { courseConverter } from "../firestore";
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IdentifiableCourse } from "@interfaces/type";

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
  // const updatedCourse = defaultCourse(course);

  const { id, ...res } = course;

  await updateDoc(courseDoc, res);

  console.log("Course information updated");
  return course;
};

export const getCourse = async (courseID: String) => {
  const courseDoc = await getDoc(
    doc(db, `courses/${courseID}`).withConverter(courseConverter)
  );

  return { id: courseID, ...courseDoc.data()} as IdentifiableCourse;
};

export const deleteCourse = async (courseID: String) => {
  const courseDoc = doc(db, `courses/${courseID}`).withConverter(
    courseConverter
  );

  await deleteDoc(courseDoc);
  console.log("Course deleted");
};
