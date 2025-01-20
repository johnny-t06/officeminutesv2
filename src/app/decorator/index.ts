import { unauthorizedErrorResponse } from "@api/route.schema";
import { IdentifiableUser } from "@interfaces/type";
import { getUser } from "@services/client/user";
import { NextRequest, NextResponse } from "next/server";

interface AuthorizedSession {
  user: NonNullable<IdentifiableUser>;
}
interface AuthroziedSessionApiHandlerParams {
  req: NextRequest;
  res: NextResponse;
  session: AuthorizedSession;
}

type SessionApiHandler = (
  params: AuthroziedSessionApiHandlerParams
) => Promise<NextResponse>;

export const withSession =
  (handler: SessionApiHandler) =>
  async (req: NextRequest, res: NextResponse) => {
    const response = await fetch("/api/auth", {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.json(unauthorizedErrorResponse, { status: 401 });
    }

    const data = await response.json();
    const user = await getUser(data.user.uid);
    if (!user) {
      return NextResponse.json(unauthorizedErrorResponse, { status: 401 });
    }

    return handler({ req, res, session: { user } });
  };
