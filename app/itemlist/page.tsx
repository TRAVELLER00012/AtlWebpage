import styles from "../styles/item-list.module.css"
import ItemListComponent from "../components/ItemListComponent"
import EnsureAuthentication from "../components/EnsureAuthentication"
function ItemList(){    
    return (
        <>
            <EnsureAuthentication />
            <div className={styles.main}>
                <div className={[styles.itemSelection,styles.itemList].join(" ")}>

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
        </>
    )
}

export default ItemList