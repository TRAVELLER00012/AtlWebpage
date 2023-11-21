'use client'

import { useEffect, useState } from "react"
import itemListService from "../services/itemListService"
import { Item } from "../services/itemListService";
import { CanceledError } from "../services/api-client";
import ItemCard from "../components/ItemCard"
import Alert from "./Alert";
const ItemListComponent = () => {
    const [items,setItems] = useState<Item[]>([]);

    useEffect(() =>{
        let {request,cancel} = itemListService.getAllItems()
        request.then(res =>{
            let data = res.data;
            setItems(data) 
                       
        }).catch(err =>{
            if (err == CanceledError) return;
        })
        return () => cancel();
    },[])

    return(
        <>
            {items.length == 0 ? <Alert>No Items in List...</Alert> : items.map(item =><ItemCard key={item.id} id={item.id} count={item.id} issuable={item.issuable ? "Yes" : "No"} name={item.name} quantity={item.quantity}/>)}
        </>

    )
}

export default ItemListComponent