import styles from "../styles/item-list.module.css"
interface Props{
    count:number,
    name:string,
    quantity:number,
    issuable:"Yes"|"No"
}
function ItemCard({count,issuable,name,quantity}:Props){
    return (
        <div className={styles.parentItem}>
            <div>{count}</div>
            <div>{name}</div>
            <div>{quantity}</div>
            <div>{issuable}</div>
        </div>    
    )
}
export default ItemCard;