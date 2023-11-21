import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function useAuthenticator(){
    const {data,status} = useSession();
    if (status === "unauthenticated") redirect("./auth/")
    else {
        localStorage.setItem('userEmail', data?.user?.email!);
    }

}