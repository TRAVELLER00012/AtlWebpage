import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function useAuthenticator() {
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    redirect("./auth/");
  } else {
    
    if (typeof window !== "undefined") {
      if (data && data.user && data.user.email) {
        localStorage.setItem('userEmail', data.user.email);
      }
    }
  }
}
