export const sendFeedback = async (
  recommendation: string,
  feedback: string
) => {
  const response = await fetch("/api/send-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recommendation, feedback }),
  });

  const json = await response.json();

  return json;
};
