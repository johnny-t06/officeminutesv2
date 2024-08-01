import { db } from "../../../../firebase";
import { Course } from "@interfaces/db";
import { courseConverter } from "../firestore";
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  PartialWithFieldValue,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defaultCourse } from "services/utils/defaultValue";
import { IdentifiableCourse } from "@interfaces/type";


type addCourse = Pick<Course, "name" | "location" | "professors"> &
  PartialWithFieldValue<Course>;

export const addCourse = async (course: Course, courseID: string) => {
  const courseDoc: DocumentReference = doc(
    db,
    `courses/${courseID}`
  ).withConverter(courseConverter);

  // const newCourse = defaultCourse(course);

  await setDoc(courseDoc, course);

  console.log("New course created: ");

  return { id: courseID, ...course } as IdentifiableCourse;
};

export const updateCourse = async (course: IdentifiableCourse) => {
  const courseDoc = doc(db, `courses/${course.id}`).withConverter(
    courseConverter
  );
  // const updatedCourse = defaultCourse(course);

  const { id, ...res } = course;

  const updatedDoc = await updateDoc(courseDoc, res);

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
