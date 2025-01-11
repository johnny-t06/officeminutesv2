export const verifyIdToken = async (idToken: string) => {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: idToken }),
  });

  const data = await response.json();
  return data;
};
