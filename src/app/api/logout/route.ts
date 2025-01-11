import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json(
      { message: "Successfully logged out" },
      { status: 200 }
    );

    // Remove the session cookie by setting Max-Age to 0
    response.headers.set(
      "Set-Cookie",
      `session=; Max-Age=0; Path=/; HttpOnly; Secure = ${
        process.env.NODE_ENV === "production"
      }`
    );

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
};
