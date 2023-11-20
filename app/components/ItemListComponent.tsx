'use client'

import { useEffect, useState } from "react"
import itemListService from "../services/itemListService"
import { Item } from "../services/itemListService";
import { CanceledError } from "../services/api-client";
import ItemCard from "../components/ItemCard"
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
            {console.log(items)}
            {items.map(item =><ItemCard count={item.id} issuable={item.issuable ? "Yes" : "No"} name={item.name} quantity={item.quantity}/>)}
        </>

    )
}

export default ItemListComponent