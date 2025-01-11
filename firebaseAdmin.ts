import * as admin from "firebase-admin";
if (!process.env.FIREBASE_ADMIN_SDK_JSON) {
  throw new Error("FIREBASE_ADMIN_SDK_JSON is not set");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON)
    ),
  });
}

export default admin;
