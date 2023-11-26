import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import users from "../services/users";

interface UseAuthenticatorResult {
  email: string | null;
  id : number | null
}

export default function useAuthenticator(): UseAuthenticatorResult {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const { data, status } = useSession();

  useEffect(() => {
    const authenticateUser = async () => {
      if (status === "authenticated") {
        const userEmail = data?.user?.email;
        if (userEmail) {
          const {request} = users.getAllUser();
          request.then(res =>{
            res.data.map(d =>{
              if (d.email === email) {
                setId(d.id)
                sessionStorage.setItem('userId',d.id.toString())
              }
            })
          })
          sessionStorage.setItem('userEmail', userEmail);
          setEmail(userEmail);
        }
      }
      else if (status === "unauthenticated") {
        router.push("/auth/")
      }
    };

    authenticateUser();
  }, [data, status]);

  return { email , id };
}
