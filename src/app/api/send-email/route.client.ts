interface SendEmailBody {
  email: string;
  subject: string;
  body: string;
}

export const sendEmail = async (body: SendEmailBody) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  return json;
};
