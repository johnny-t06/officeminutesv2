import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json(
      { message: "Successfully logged out" },
      { status: 200 }
    );
    response.cookies.delete("session");
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
};
