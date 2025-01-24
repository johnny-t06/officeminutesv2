import { useUserSession } from "@context/UserSessionContext";
import { useRouter } from "next/navigation";
import React from "react";

export const useUserOrRedirect = () => {
  const { user, session } = useUserSession();
  const router = useRouter();
  React.useEffect(() => {
    if (!user && !session.isLoading) {
      router.push("/login");
    }
  }, [user, router, session]);

  return user ?? null;
};
