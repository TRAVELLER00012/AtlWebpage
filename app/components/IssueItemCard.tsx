import styles from "../styles/issueitems.module.css"
interface Props{
    count:number,
    name:string,
    quantity:number,
    issueDate:string,
    returnDate:string,
}
function ItemCard({count,name,quantity,issueDate,returnDate}:Props){
    return (
        <div className={[styles.itemSelection,styles.items].join(" ")}>
            <div>{count}</div>
            <div>{name}</div>
            <div>{quantity}</div>
            <div>{issueDate}</div>
            <div>{returnDate}</div>
            <div className={styles.remove}>Return</div>
        </div>    
    )
}
export default ItemCard;