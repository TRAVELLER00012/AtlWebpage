
import { useState } from "react"
import { CanceledError } from "../services/api-client"
import pendingService, { Pending } from "../services/pendingService"
import styles from "../styles/notification.module.css"
import { NotificationData } from "./NavBar"
import issuedItemService, { Item } from "../services/issuedItemService"
import itemListService from "../services/itemListService"
import notificationService from "../services/notificationService"
import LoadingCircle from "./LoadingCircle"

interface Props{
    data : NotificationData[],
    setVisbility: (val : boolean) => void
}


const NotificationComponent = ({data,setVisbility} : Props) => {
    const [itemState,setItemState] = useState(false);
    const [returnState, setReturnState] = useState(false)
    const [loading,setLoading] = useState(false)
    const choice = (state : Pending["state"], id : number) => {
        setLoading(true)
        const getPending = pendingService.getItem(id)
        getPending.then(res=>{
            let newData : Pending = {
                id : res.data.id,
                dateOfReturn: res.data.dateOfReturn,
                description : res.data.description,
                itemId: res.data.itemId,
                quantity : res.data.quantity,
                userId : res.data.userId,
                state : state
            }
            const updatePending = pendingService.updateItem(id,newData);
            updatePending.then(res =>{
                setItemState(true)
                window.location.reload();
            })
            updatePending.catch(err =>{
                if (err == CanceledError) return;
            })
            
        }).catch(err =>{
            if (err == CanceledError) return;
        }).finally(() =>{
            setLoading(false)
        })
    }
    const accept = (id:number) =>{
        setLoading(true)
        const currentDate = new Date();
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const request = pendingService.getItem(id);
        request.then(({data}) =>{
            const itemRequest = itemListService.getItem(data.id)
            itemRequest.then(itemResponse =>{
                let newItem : Item = {
                    id : 0,
                    dateOfIssue : currentDate.getDate() + " "+months[currentDate.getMonth()]+ " "+ currentDate.getFullYear(),
                    dateOfReturn : data.dateOfReturn,
                    itemId : data.itemId,
                    itemName : itemResponse.data.name,
                    quantity : data.quantity,
                    userId : data.userId
                }
                
                issuedItemService.addIssuedItem(newItem).catch(err => {if (err == CanceledError) return;})
                itemListService.updateItem(data.id,{
                    id:data.id,
                    issuable : itemResponse.data.issuable,
                    name : itemResponse.data.name,
                    quantity : itemResponse.data.quantity - data.quantity
                })
                choice("Accepted",id)
            }).catch(err =>{if (err == CanceledError) return;})
        }).catch(err =>{if (err == CanceledError) return;}).finally(() =>{
            setLoading(false)
        })
        
    }

    const reject = (id:number) => {
        choice("Rejected",id)
    }
    const returnItem = (id : number, index : number | undefined) =>{
        const issuedItem = issuedItemService.getItem(id)
        setLoading(true)
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
                deleteIsseudItem.then(res =>{
                    window.location.reload()
                }).catch(err =>{if (err == CanceledError) return;})
            }).catch(err =>{if (err == CanceledError) return;})
        }).catch(err =>{if (err == CanceledError) return;}).finally(() => setLoading(false))
        
        
        if (index)
            notificationService.deleteNotification(index)
        

    }
    return (
        <div className={styles.main}>
            <div className={styles.heading}>
                <h1 onClick={() => setVisbility(false)}>Notifications</h1>
                {loading && <LoadingCircle />}
            </div>
            <div className={styles.content} >
                {data.map((d) =>(
                    <div className={styles.msg} key={d.id}>
                        {d.state == "ModReview" && (
                            <div className={styles.name}>
                                By: {d.userName}
                            </div>
                        )}
                        <div className={styles.userMsg}>
                            {d.state == "Pending" && <p>You sent a request to issue a/an <span className={styles.red}>{d.itemName}</span> , quantity: <span className={styles.red}>{d.quantity}</span>; please wait for one of the administrators to accept; you&sbquo;ll see the decision by them here.</p>}
                            {d.state == "Accepted" && <p>One of our administrators has accepted your request for issue item: <span className={styles.red}>{d.itemName}</span>, quantity: <span className={styles.red}>{d.quantity}</span>. Please make sure to return it as soon as possible.</p>}
                            {d.state == "Rejected" && <p>One of our administrators has rejected  your request for issue item: <span className={styles.red}>{d.itemName}</span>, quantity: <span className={styles.red}>{d.quantity}</span>.</p>}
                            {d.state == "ModReview" && <p>One of our student has requested to issue an item..<br/><br/>Item Name: <span className={styles.red}>{d.itemName}</span>, quantity: <span className={styles.red}>{d.quantity}</span><br/><br/>
                                                            <button className={[styles.pendingButton,styles.accept].join(" ")}
                                                                    onClick={() => accept(d.id)}
                                                                    disabled={itemState}
                                                                    >Accept</button>
                                                            <button className={[styles.pendingButton,styles.decline].join(" ")} 
                                                                    onClick={() =>reject(d.id)}
                                                                    disabled={itemState}>Reject</button>
                                                        </p>}
                            {d.state == "Return" && <p>
                                                        {d.description}
                                                        <br />
                                                        <button className={[styles.pendingButton,styles.accept].join(" ")} 
                                                                onClick={() => returnItem(d.id,data[data.indexOf(d)].otherID)}
                                                                disabled={returnState}>Click if Student has Returned Item</button>
                                                    </p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotificationComponent