import { useState } from "react";
import styles from "../styles/item-list.module.css"
import ExtraItemInfo from "./ExtraItemInfo";
import PendingCard from "./PendingCard";
interface Props{
    id:number,
    count:number,
    userId : number,
    name:string,
    quantity:number,
    issuable:"Yes"|"No",
}
function ItemCard({id,count,issuable,name,quantity,userId}:Props){
    const [cardVisility, setCardVisibility] = useState(false)
    const [isIssued, setIsIssued] = useState(false)
    const [visible,setVisibility] = useState(false)

    return (
        <>
            <div className={[styles.parentItem,styles.itemCard].join(" ")}>
                <div>{count}</div>
                <div className={styles.name} onClick={() => {setVisibility(!visible)}}>{name}</div>
                <div className={styles.quantity}>{quantity}</div>
                <div onClick={() =>{
                        if(issuable == "Yes"){
                            setCardVisibility(!cardVisility)
                        }
                    }
                } className={styles.issuable}>
                    {issuable}
                    {isIssued && <p className={styles.issued}>Pending</p>}
                </div>
            </div>
            {visible && <ExtraItemInfo id={id} visibility={setVisibility} setCardVisibility={setCardVisibility}/>}
            {(cardVisility && !isIssued) && <PendingCard  max={quantity} userId={userId} itemId={id} cancel={() => setCardVisibility(false)} submit={() => {
                setIsIssued(true)
                setCardVisibility(false)
            }}/>}
        </>    
    )
}
export default ItemCard;