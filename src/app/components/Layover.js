"use client";
import SignIn from "./SignIn";
import AppState from "../../contexts/AppState";
import { useSession } from "next-auth/react";
const Layover = ({ children }) => {
  const { data: session } = useSession();
  if (session) {
    return <AppState>{children}</AppState>;
  } else {
    return (
      <AppState>
        <SignIn />
      </AppState>
    );
  }
};

export default Layover;
