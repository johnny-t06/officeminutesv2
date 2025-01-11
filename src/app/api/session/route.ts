import { getFirebaseAdminApp } from "@project/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { token } = await request.json();
  const admin = getFirebaseAdminApp();
  try {
    const decodedToken = await admin.auth().verifySessionCookie(token);
    return NextResponse.json(
      { message: "Valid token", decodedToken },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error verifying token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 500 });
  }
};
