'use client'
import { useEffect, useState } from "react"
import IssueItemCard from "../components/IssueItemCard";
import issuedItemService, { Item } from "../services/issuedItemService"
import { CanceledError } from "../services/api-client"
import Alert from "./Alert";
import { useSession } from "next-auth/react";

const IssueItemList = () => {
    const session = useSession();
    
    const [items,setItems] = useState<Item[]>([])
    useEffect(() =>{
        const email = session.data?.user?.name;
        console.log(email)
        let {request,cancel} = issuedItemService.getAllItems()
                request.then(res =>{
            let data = res.data;
            setItems(data)
        }).catch(err =>{
                    if (err == CanceledError) return;
                })


        return () => cancel();
    },[])
    return (
        <>
            {items.length == 0 ? <Alert>No items Issued yet</Alert> :             
            items.map(item =>(
                <IssueItemCard key={item.id} id={item.id} count={item.id} issueDate={item.dateOfIssue} name={item.itemName} quantity={item.quantity} returnDate={item.dateOfReturn}/>
            ))}
        </>
    )
}

export default IssueItemList