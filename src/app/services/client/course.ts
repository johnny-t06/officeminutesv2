import { db } from "../../../../firebase";
import { Course } from "@interfaces/db";
import { courseConverter } from "../firestore";
import {
  deleteDoc,
  doc,
  DocumentReference,
  PartialWithFieldValue,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type addCourse = Pick<Course, "name" | "location" | "professors"> &
PartialWithFieldValue<Course>

export const addCourse = async (
  course: addCourse,
  courseID: string,
) => {
  try {
    const courseDoc: DocumentReference = doc(
      db,
      `courses/${courseID}`
    ).withConverter(courseConverter);

    const newCourse: addCourse = {
      name: course.name,
      location: course.location,
      professors: course.professors,
      students: course.students ?? [],
      tas: course.tas ?? [],
      onDuty: course.onDuty ?? [],
      tags: course.tags ?? {},
    };

    await setDoc(courseDoc, newCourse);

    console.log("New course created: ");
    return courseDoc;
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = async (
  course: PartialWithFieldValue<Course>,
  courseID: String
) => {
  try {
    const courseDoc = doc(
      db,
      `courses/${courseID}`
    ).withConverter(courseConverter);

    const updatedDoc = await updateDoc(courseDoc, course);

    console.log("Course information updated");
    return updatedDoc;
  } catch (error) {
    console.log(error);
  }
};

export const getCourse = async (courseID: String) => {
  try {
    const courseDoc = doc(
      db,
      `courses/${courseID}`
    ).withConverter(courseConverter);

    return courseDoc;
  } catch (error) {
    console.log(error);
  }
};

export const deletingCourse = async (courseID: String) => {
  try {
    const courseDoc = doc(
      db,
      `courses/${courseID}`
    ).withConverter(courseConverter);

    await deleteDoc(courseDoc);
    console.log("Course deleted");
  } catch (error) {
    console.log("Error deleting course: ", error);
  }
};
