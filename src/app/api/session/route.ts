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
    console.log("Failed to veriy session", error);
    const response = NextResponse.json({ message: "Reauthenticate" });
    response.cookies.delete("session");
    return response;
  }
};
