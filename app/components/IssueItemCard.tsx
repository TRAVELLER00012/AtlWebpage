import styles from "../styles/item-list.module.css"
interface Props{
    count:number,
    name:string,
    quantity:number,
}
function ItemCard({count,name,quantity}:Props){
    return (
        <div className={styles.parentItem}>
            <div>{count}</div>
            <div>{name}</div>
            <div>{quantity}</div>
            <div className={styles.remove}>Return</div>
        </div>    
    )
}
export default ItemCard;