import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  throw new Error("SendGrid API key is not set.");
}

sgMail.setApiKey(apiKey);

export const POST = async (request: NextRequest) => {
  try {
    const { email, subject, body } = await request.json();

    const message = {
      to: email,
      from: "officeminutesapp@gmail.com",
      subject: subject,
      text: body,
    };

    await sgMail.send(message);

    return NextResponse.json({
      code: "SUCCESS",
      message: `Email sent to: ${email}`,
    });
  } catch (error: any) {
    console.error(
      "SendGrid error:",
      error.response?.body || error.message || error
    );

    return NextResponse.json({
      code: "ERROR",
      message: error,
    });
  }
};
