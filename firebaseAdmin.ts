import "server-only";
import admin from "firebase-admin";

if (
  !process.env.FIREBASE_PRIVATE_KEY ||
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
) {
  throw new Error("FIREBASE_PRIVATE_KEY is not set");
}
let firebaseApp: admin.app.App | undefined;

export const getFirebaseAdminApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }
  try {
    if (admin.apps.length > 0) {
      firebaseApp = admin.apps[0] || undefined;
    } else {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(
            /\\n/g,
            "\n"
          ),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
  }

  return firebaseApp!;
};
