import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminApp } from "./firebaseAdmin";

export const middleware = async (request: NextRequest) => {
  const admin = getFirebaseAdminApp();
  const sessionCookie = request.cookies.get("session");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the session cookie with Firebase Admin SDK
    await admin.auth().verifySessionCookie(sessionCookie.value, true);

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/private/*"],
};
