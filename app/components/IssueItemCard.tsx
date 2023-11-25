import { useState } from "react";
import styles from "../styles/issueitems.module.css"
import ExtraIssuedItemInfo from "./ExtraIssuedItemInfo";
interface Props{
    id:number,
    count:number,
    name:string,
    quantity:number,
    issueDate:string,
    returnDate:string,
}
function ItemCard({id,count,name,quantity,issueDate,returnDate}:Props){
    const [visibile, setVisibility] = useState(false)
    return (
        <>
            <div className={[styles.itemSelection,styles.items].join(" ")}>
                <div>{count}</div>
                <div onClick={() => setVisibility(!visibile)} className={styles.name}>{name}</div>
                <div>{quantity}</div>
                <div>{issueDate}</div>
                <div>{returnDate}</div>
                <div className={styles.remove} onClick={() =>{
                    
                }}>Return</div>
            </div>
            {visibile && <ExtraIssuedItemInfo id={id} visibility={setVisibility}/>}    
        </>
    )
}
export default ItemCard;