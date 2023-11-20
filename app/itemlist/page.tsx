import styles from "../styles/item-list.module.css"
import ItemCard from "../components/ItemCard"
import ItemListComponent from "../components/ItemListComponent"
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
               <ItemListComponent />
            </div>
        </div>
    )
}

export default ItemList