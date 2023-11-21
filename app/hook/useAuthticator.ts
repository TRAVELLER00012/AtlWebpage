import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function useAuthenticator(){
    const {status} = useSession();
    if (status === "unauthenticated") redirect("./auth/")

}