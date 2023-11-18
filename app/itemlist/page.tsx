import styles from "../styles/item-list.module.css"
import ItemCard from "../components/ItemCard"
function ItemList(){
    return (
        <div className={styles.main}>
            <div className={styles.itemSelection}>

                <div className={styles.count}>
                    Sr. No
                </div>
                
                <div className="name">
                    Name
                </div>
                
                <div className="quantity">
                    Quantity
                </div>
                
                <div className="issuable">
                    Issuable
                </div>
            </div>
            <div className={styles.items}>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
                <ItemCard  count={1} name="D" quantity={1} issuable="Yes"/>
            </div>
        </div>
    )
}

export default ItemList