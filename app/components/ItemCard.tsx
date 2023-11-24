import { useEffect, useState } from "react";
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
    const [cardVibility, setCardVibility] = useState(false)
    const [isIssued, setIsIssued] = useState(false)
    const [visible,setVisibility] = useState(false)

    return (
        <>
            <div className={[styles.parentItem,styles.itemCard].join(" ")}>
                <div>{count}</div>
                <div className={styles.name} onClick={() => {setVisibility(!visible)}}>{name}</div>
                <div>{quantity}</div>
                <div onClick={() =>{
                        if(issuable == "Yes"){
                            setCardVibility(!cardVibility)
                        }
                    }
                }>
                    {issuable}
                    {isIssued && <p className={styles.issued}>Pending</p>}
                </div>
            </div>
            {visible && <ExtraItemInfo id={id} visibility={setVisibility} />}
            {(cardVibility && !isIssued) && <PendingCard  max={quantity} userId={userId} itemId={id} cancel={() => setCardVibility(false)} submit={() => {
                setIsIssued(true)
                setCardVibility(false)
            }}/>}
        </>    
    )
}
export default ItemCard;