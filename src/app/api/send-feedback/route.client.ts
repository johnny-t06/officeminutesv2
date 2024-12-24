interface FeedbackBody {
  recommendation: string;
  feedback: string;
}

export const sendFeedback = async (body: FeedbackBody) => {
  const response = await fetch("/api/send-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  return json;
};
