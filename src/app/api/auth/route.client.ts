export const setSessionCookie = async (idToken: string) => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json();
  return data;
};

export const getUserFromSession = async () => {
  const response = await fetch("/api/auth", {
    method: "GET",
  });
  const data = await response.json();
  return data.user || null;
};
