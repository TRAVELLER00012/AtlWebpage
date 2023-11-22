import { useState } from "react";
import styles from "../styles/item-list.module.css"
import ExtraItemInfo from "./ExtraItemInfo";
interface Props{
    id:number,
    count:number,
    name:string,
    quantity:number,
    issuable:"Yes"|"No",
}
function ItemCard({id,count,issuable,name,quantity}:Props){
    const [isIssued, setIsIssued] = useState(false)
    const [visible,setVisibility] = useState(false);
    return (
        <>
            <div className={[styles.parentItem,styles.itemCard].join(" ")}>
                <div>{count}</div>
                <div className={styles.name} onClick={() => {setVisibility(!visible)}}>{name}</div>
                <div>{quantity}</div>
                <div onClick={() =>{
                        if(issuable == "Yes") setIsIssued(!isIssued)
                    }
                }>
                    {issuable}
                    <p className={isIssued ? styles.issued : styles.hidden}>Pending</p>
                </div>
            </div>
            {visible && <ExtraItemInfo id={id} visibility={setVisibility} />}
        </>    
    )
}
export default ItemCard;