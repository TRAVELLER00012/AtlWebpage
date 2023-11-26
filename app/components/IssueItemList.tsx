'use client'
import { useEffect, useState } from "react"
import IssueItemCard from "../components/IssueItemCard";
import issuedItemService, { Item } from "../services/issuedItemService"
import { CanceledError } from "../services/api-client"
import Alert from "./Alert";
import users from "../services/users";
interface Props{
    email : string
}
const IssueItemList = ({email} : Props) => {

    const [items,setItems] = useState<Item[]>([])
    useEffect(() =>{
        let {request,cancel} = issuedItemService.getAllItems()
                request.then(res =>{
            let data = res.data;
            let set : Set<number> = new Set();
            data.forEach(d =>{
                set.add(d.userId)
            })
        
        set.forEach(async (s) =>{
            let userRequest = await users.getUser(s)
            if (userRequest.data.email === email) {
                setItems(data.filter(d => d.userId === s))
                return;
            }
            
        })
        }).catch(err =>{
            if (err == CanceledError) return;
        })
        return () => cancel();
    },[])
    return (
        <>
            {items.length == 0 ? <Alert>No items Issued yet</Alert> :             
            items.map(item =>(
                <IssueItemCard key={item.id} id={item.id} count={item.id} email={email} issueDate={item.dateOfIssue} name={item.itemName} quantity={item.quantity} returnDate={item.dateOfReturn}/>
            ))}
        </>
    )
}

export default IssueItemList