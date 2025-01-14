import { getFirebaseAdminApp } from "@project/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { idToken } = await request.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const admin = getFirebaseAdminApp();
  try {
    // Create the session cookie
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    // Set the cookie in the response
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      path: "/",
    };

    const response = NextResponse.json(
      { message: "Session cookie created" },
      { status: 200 }
    );
    response.cookies.set("session", sessionCookie, options);
    return response;
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return NextResponse.json(
      { message: "Error creating session cookie" },
      { status: 500 }
    );
  }
};
