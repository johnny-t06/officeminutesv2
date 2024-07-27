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

export const addCourse = async (
  course: Pick<Course, "name" | "courseId" | "location" | "professors"> &
    PartialWithFieldValue<Course>
) => {
  try {
    const courseDoc: DocumentReference = doc(
      db,
      `courses/${course.courseId}`
    ).withConverter(courseConverter);

    const newCourse = {
      name: course.name,
      courseId: course.courseId,
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
  courseId: String
) => {
  try {
    const courseDoc: DocumentReference = doc(
      db,
      `courses/${courseId}`
    ).withConverter(courseConverter);

    const updatedDoc = await updateDoc(courseDoc, course);

    console.log("Course information updated");
    return updatedDoc;
  } catch (error) {
    console.log(error);
  }
};

export const getCourse = async (courseId: String) => {
  try {
    const courseDoc: DocumentReference = doc(
      db,
      `courses/${courseId}`
    ).withConverter(courseConverter);

    return courseDoc;
  } catch (error) {
    console.log(error);
  }
};

export const deletingCourse = async (courseId: String) => {
  try {
    const courseDoc: DocumentReference = doc(
      db,
      `courses/${courseId}`
    ).withConverter(courseConverter);

    await deleteDoc(courseDoc);
    console.log("Course deleted");
  } catch (error) {
    console.log("Error deleting course: ", error);
  }
};
