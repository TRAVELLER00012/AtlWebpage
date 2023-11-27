import { useRef, useState } from "react"
import pendingService from "../services/pendingService"
import styles from "../styles/pending-card.module.css"
import users from "../services/users"
import issuedItemService from "../services/issuedItemService"
import itemListService from "../services/itemListService"
import LoadingCircle from "./LoadingCircle"
interface Props{
    max : number,
    itemId : number,
    userId : number,
    cancel : () => void,
    submit : () => void
}
let months : string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
const PendingCard = ({max,cancel,itemId,submit,userId} : Props) => {
    const quantity = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const [loading,setLoading] = useState(false);
  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <div className={styles.heading}>
                <div>
                    <h1>Information</h1>
                    {loading && <LoadingCircle />}
                </div>
            </div>
            <div className={styles.form}>
                <form onSubmit={(event) =>{      
                    setLoading(true)              
                    event.preventDefault()
                        const userRequet = users.getUser(userId)
                        userRequet.then(res =>{
                            const item = itemListService.getItem(itemId)
                            if (res.data.user_type == "Moderator"){

                                    const currentDate = new Date()
                                    item.then(res =>{
                                        if (quantity.current && description.current && date.current){
                                            issuedItemService.addIssuedItem({
                                                dateOfIssue : currentDate.getDate() + ", "+ months[currentDate.getMonth()] + ", " + currentDate.getFullYear(),
                                                dateOfReturn : date.current.value,
                                                id :0,
                                                itemId : itemId,
                                                quantity: parseInt(quantity.current.value),
                                                itemName : res.data.name,
                                                userId : userId
                                            }).then(() =>{
                                                const updateItem = itemListService.updateItem(itemId,{
                                                    id : itemId,
                                                    issuable : res.data.issuable,
                                                    name : res.data.name,
                                                    quantity : res.data.quantity - parseInt(quantity.current!.value)
                                                }).then(() =>{
                                                    setLoading(false)
                                                    window.location.reload()
                                                })
                                            })
                                        }
                                    })

                                
                            }
                            else{
                                item.then(res =>{
                                    if (quantity.current && description.current && date.current){
                                        const r=pendingService.addItem({
                                            id : 0,
                                            dateOfReturn : date.current.value,
                                            description : description.current.value,
                                            itemId : itemId,
                                            quantity : parseInt(quantity.current.value),
                                            state : "Pending",
                                            userId : userId
                                        }).then(() =>{
                                            setLoading(false)
                                            window.location.reload();
                                        })

                                    }

                                })
                            }
                        })
                        
                    
                }}>
                    <input type="number" placeholder="Quantity" required min={1} max={max} ref={quantity}/>
                    <br />
                    <textarea placeholder="Description" maxLength={255} ref={description}/>
                    <input type="date" ref={date}/>
                    <div className={styles.buttons}>
                        <button type="submit" disabled={loading}>Submit</button>
                        <button type="reset" onClick={() => cancel()}  disabled={loading}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PendingCard
