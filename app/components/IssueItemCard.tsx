import { useEffect, useState } from "react";
import styles from "../styles/issueitems.module.css"
import ExtraIssuedItemInfo from "./ExtraIssuedItemInfo";
import notificationService from "../services/notificationService";
import issuedItemService from "../services/issuedItemService";
import users from "../services/users";
import itemListService from "../services/itemListService";
interface Props{
    id:number,
    count:number,
    name:string,
    quantity:number,
    issueDate:string,
    returnDate:string,
    email:string
}
function ItemCard({id,count,name,quantity,issueDate,returnDate,email}:Props){
    const [visibile, setVisibility] = useState(false)
    interface ItemInfo {name : string,itemName:string, quantity: number}
    const [itemInfo,setItemInfo] = useState<ItemInfo>()
    useEffect(() =>{
        const request = issuedItemService.getItem(id)
        request.then(res =>{
            let userRequest = users.getUser(res.data.userId)
            userRequest.then(userRes =>{
                let itemRequest = itemListService.getItem(res.data.itemId)
                itemRequest.then(itemRes =>{
                    if(itemRes.data){
                        let newItem : ItemInfo = {
                            itemName : itemRes.data.name,
                            name : userRes.data.firstName + " " + userRes.data.lastName,
                            quantity : res.data.quantity 
                        } 
                        setItemInfo(newItem)
                    }
                })
            })
        })
    },[])
    return (
        <>
            <div className={[styles.itemSelection,styles.items].join(" ")}>
                <div>{count}</div>
                <div onClick={() => setVisibility(!visibile)} className={styles.name}>{name}</div>
                <div>{quantity}</div>
                <div>{issueDate}</div>
                <div>{returnDate}</div>
                <div className={styles.remove} onClick={() =>{
                    const {request,cancel} = users.getAllUser();
                    request.then(res =>{    
                        res.data.map(d =>{
                            if (d.email == email && d.user_type == "Moderator"){
                                const issuedItem = issuedItemService.getItem(id)
                                issuedItem.then(issuedRes =>{
                                    const item = itemListService.getItem(issuedRes.data.itemId)
                                    item.then(itemRes =>{
                                        const updateItem = itemListService.updateItem(itemRes.data.id,{
                                            id: itemRes.data.id,
                                            issuable : itemRes.data.issuable,
                                            name : itemRes.data.name,
                                            quantity : itemRes.data.quantity + issuedRes.data.quantity
                                        })
                                        const deleteIsseudItem = issuedItemService.deleteIssuedItem(id)

                                    })
                                })
                                return;
                            }else if (d.email == email){
                                notificationService.addNotification({
                                    access : "Moderators",
                                    description : `${itemInfo?.name} has requested to return item: ${itemInfo?.itemName} (quantity: ${itemInfo?.quantity})`,
                                    id :0,
                                    notificationType : "Return",
                                    issuedItemId: id
                                })
                                return;
                            }
                        })
                    })
                }}>Return</div>
            </div>
            {visibile && <ExtraIssuedItemInfo id={id} visibility={setVisibility}/>}    
        </>
    )
}
export default ItemCard;