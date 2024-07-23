import { db } from "../../../firebase";
import { Course } from "../types/db";
import { courseConverter } from "../services/firestore";
import {
  doc,
  DocumentReference,
  PartialWithFieldValue,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const addCourse = async (course: PartialWithFieldValue<Course>) => {
  try {
    const courseDoc: DocumentReference = doc(
      db,
      `courses/${course.courseId}`
    ).withConverter(courseConverter);

    const newCourse = {
      name: course.name,
      courseId: course.courseId,
      location: course.location,
      professors: course.professors || [],
      students: course.students || [],
      tas: course.tas || [],
      onDuty: course.onDuty || [],
      tags: course.tags || {},
    };

    await setDoc(courseDoc, newCourse);

    console.log("New course created: ");
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

    await updateDoc(courseDoc, course);

    console.log("Course information updated");

  } catch (error) {
    console.log(error);
  }
};
