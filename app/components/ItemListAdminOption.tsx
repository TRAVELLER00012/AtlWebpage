'use client'

import { useEffect, useState } from "react"
import itemListService, { Item } from "../services/itemListService"
import { CanceledError } from "../services/api-client"
import users from "../services/users"
import AdminComponent from "./AdminComponent"

interface Props{
    email:string
}
const ItemListAdminOption = ({email} : Props) => {

    const [data,setData] = useState<Item[]>();
    const [allow,setAllow] = useState(false)


    useEffect(() => {
        const {request,cancel} = itemListService.getAllItems();
        request.then(res =>{
            setData(res.data)
        }).catch(err =>{
            if (err == CanceledError) return;
        })

        const {request : userRequest} = users.getAllUser();
        userRequest.then(res =>{
            let set : Set<number>= new Set();
            res.data.forEach(d =>{
                set.add(d.id)
            })
            set.forEach(async (s) =>{
                const u = await users.getUser(s);
                if (u.data.email === email){
                    if (u.data.user_type == "Moderator") setAllow(true)
                    else setAllow(false)
                    return;
                }
            })
        }).catch(err => {
            if (err == CanceledError) return;
        })
        return () => cancel();
    },[])

    return (
        <>
            {allow ? <AdminComponent data={data!} /> : null}
        </>
    )
    
}

export default ItemListAdminOption