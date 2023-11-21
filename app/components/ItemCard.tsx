import { useState } from "react";
import styles from "../styles/item-list.module.css"
import ExtraItemInfo from "./ExtraItemInfo";
interface Props{
    id:number,
    count:number,
    name:string,
    quantity:number,
    issuable:"Yes"|"No"
}
function ItemCard({id,count,issuable,name,quantity}:Props){
    const [visible,setVisibility] = useState(false);
    return (
        <>
            <div className={[styles.parentItem,styles.itemCard].join(" ")}>
                <div>{count}</div>
                <div className={styles.name} onClick={() => {
                            setVisibility(!visible)
                        }}>{name}</div>
                <div>{quantity}</div>
                <div>{issuable}</div>
            </div>
            {visible && <ExtraItemInfo id={id} visibility={setVisibility} />}
        </>    
    )
}
export default ItemCard;