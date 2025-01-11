import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get("session");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const origin = request.nextUrl.origin;
  try {
    const res = await fetch(`${origin}/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: sessionCookie.value }),
    });

    if (!res.ok) {
      console.error("Error verifying session cookie:", res.statusText);
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/private/:path*"],
};
