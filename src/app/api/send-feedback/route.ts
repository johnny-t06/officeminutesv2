import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  throw new Error("SendGrid API key is not set.");
}

sgMail.setApiKey(apiKey);

export async function POST(request: NextRequest) {
  try {
    const { recommendation, feedback } = await request.json();

    if (!recommendation) {
      return NextResponse.json({
        code: "ERROR",
        message: "Recommendation not provided.",
      });
    }

    const message = {
      to: "officeminutesapp@gmail.com",
      from: "officeminutesapp@gmail.com",
      subject: "User Feedback - OfficeMinutes",
      text: `Recommendation: ${recommendation}\n\nFeedback: ${
        feedback !== "" ? feedback : "Feedback left empty"
      }`,
      html: `
        <h3>User Feedback</h3>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
        <p><strong>Feedback:</strong> ${
          feedback !== "" ? feedback : "Feedback left empty"
        }</p>
      `,
    };

    await sgMail.send(message);

    return NextResponse.json({
      code: "SUCCESS",
      message: "Feedback email sent successfully.",
    });
  } catch (error: any) {
    console.error(
      "SendGrid error:",
      error.response?.body || error.message || error
    );

    return NextResponse.json({
      code: "ERROR",
      message: "Failed to send feedback email.",
    });
  }
}
