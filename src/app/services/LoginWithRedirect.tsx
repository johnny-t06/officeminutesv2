import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db, provider } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
const LoginWithRedirect = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getRedirectResult(auth)
      .then((response) => {
        if (response) {
          const user = response.user;
          console.log(user);
          // await setDoc(doc(db, "users", user.uid), {
          //   uid: user.uid,
          //   email: user.email,
          //   name: user.displayName,
          //   role: "user",
          // });

          console.log("User signed in with Google", user.uid);
        }
      })
      .catch((error) => {
        console.log("error logging in", error);
      });
    setIsLoading(false);
  }, []);
  const onClick = async () =>
    signInWithRedirect(auth, provider).catch((error) => {
      console.error(error);
    });

  return (
    <div>
      <button
        onClick={onClick}
        disabled={isLoading || auth.currentUser !== null}
      >
        Sign in!
      </button>
    </div>
  );
};

export { LoginWithRedirect };
