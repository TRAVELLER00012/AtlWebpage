'use client'
import { useEffect, useState } from "react"
import itemListService from "../services/itemListService"
import { Item } from "../services/itemListService";
import { CanceledError } from "../services/api-client";
import ItemCard from "../components/ItemCard"
import Alert from "./Alert";
import LoadingCircle from "./LoadingCircle";
interface Props{
    userId : number
}
const ItemListComponent = ({userId} : Props) => {
    const [items,setItems] = useState<Item[]>([]);
    const [loading,setLoading] = useState(false)
    useEffect(() =>{
        let {request,cancel} = itemListService.getAllItems()
        setLoading(true)
        request.then(res =>{
            let data = res.data;
            setItems(data)         
        }).catch(err =>{
            if (err == CanceledError) return;
        }).finally(() =>{
            setLoading(false)
        })
        return () => cancel();
    },[])

    return(
        <> 
            {loading && <LoadingCircle />}
            {items.length == 0 ? <Alert>No Items in List...</Alert> : items.map(item =><ItemCard key={item.id} userId={userId} id={item.id} count={item.id} issuable={item.issuable ? "Yes" : "No"} name={item.name} quantity={item.quantity}/>)}
        </>

    )
}

export default ItemListComponent