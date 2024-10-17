import { signOutUser } from "@/lib/firebase/auth";
import { FormEvent } from "react";

export default function SignOutComponent() {
  const handleSignOut = async (e: FormEvent) => {
    await signOutUser();
  };
  return <button onClick={handleSignOut}>Sign Out</button>;
}
