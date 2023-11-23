import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import users from "../services/users";

export default function useAuthenticator() {


  const { data, status } = useSession();

  if (status === "unauthenticated") 
    redirect("./auth/"); 
  else {
        const email = data?.user?.email;

        if(email){
          const {request} = users.getAllUser()
          request.then(res =>{
            res.data.map(d =>{
              if (d.email === email) {
                if(typeof window !== "undefined" && window.localStorage){
                  localStorage.setItem('userId',d.id.toString())
                }
                return d;
              }
            })
          })
        }
  
        
        if(typeof window !== "undefined" && window.sessionStorage){
          if (email) sessionStorage.setItem('userEmail', email);
        }
            
        
    }
}
