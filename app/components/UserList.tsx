'use client'
import UserLogo from "@/public/images/profile.png"
import Card from './Card'
import { useEffect, useState } from "react"
import usersService from "../services/users"
import { User } from "../services/users"
import { CanceledError } from "../services/api-client"
import LoadingCircle from "./LoadingCircle"

const UserList = ({setLoading} : {setLoading : (val:boolean) => void}) => {
    const [users,setUsers] = useState<User[]>([])
    useEffect(() => {
        setLoading(true)
        let {request,cancel} = usersService.getAllUser();
        request.then(res =>{
            let data = res.data;
            setUsers(data)            
        }).catch(err =>{
            if (err == CanceledError) return;
        }).finally(() =>{
            // setLoading(false)
        })

        return () => cancel()

    },[])
    
    return (
        <>
            {users.map(user =>(
                <Card img={UserLogo} innerDes={user.user_type} key={user.id} id={user.id} heading={`${user.firstName} ${user.lastName}`} userInfo={true} />
            ))}
        </>
    )

}

export default UserList