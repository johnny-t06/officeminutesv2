import { NextRequest, NextResponse } from "next/server";

const redirectToLogin = (request: NextRequest) => {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("loggedOut", "true");
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("session");
  response.headers.set("x-middleware-cache", "no-cache");
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
    return redirectToLogin(request);
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
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return redirectToLogin(request);
  }
};

export const config = {
  matcher: ["/some-random-path"],
};
