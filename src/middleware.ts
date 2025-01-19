import { NextRequest, NextResponse } from "next/server";

const redirectToLogin = (request: NextRequest, hasCookie: Boolean) => {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("loggedOut", "true");
  const response = NextResponse.redirect(loginUrl);
  if (hasCookie) {
    response.cookies.delete("session");
  }
  return response;
};

export const middleware = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get("session");
  if (process.env.BYPASS_SESSION === "true") {
    console.warn("Session middleware bypassed with env var");
    return NextResponse.next();
  }

  if (!sessionCookie) {
    console.error("Session cookie not found");
    return redirectToLogin(request, false);
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
      console.error("Invalid session cookie", res.statusText);
      return redirectToLogin(request, true);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return redirectToLogin(request, true);
  }
};

export const config = {
  matcher: ["/private/:path*"],
};
