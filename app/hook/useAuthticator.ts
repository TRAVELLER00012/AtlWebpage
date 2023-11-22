import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function useAuthenticator() {
  const { data, status } = useSession();

  if (status === "unauthenticated") 
    redirect("./auth/"); 
  else {
        const email = data?.user?.email;
  
        
        // if(typeof window !== "undefined" && window.sessionStorage){
        if (email) sessionStorage.setItem('userEmail', email); 
        // }
            
        
    }
}
