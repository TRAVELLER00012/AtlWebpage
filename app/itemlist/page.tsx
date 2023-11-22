'use client'
import styles from "../styles/item-list.module.css"
import ItemListComponent from "../components/ItemListComponent"
import EnsureAuthentication from "../components/EnsureAuthentication"
import NavBar from "../components/NavBar"
import ItemListAdminOption from "../components/ItemListAdminOption"

function ItemList(){    
    const email = sessionStorage.getItem('userEmail');
    return (
        <>
            <NavBar />
            <EnsureAuthentication />
            <div className={styles.main}>
                <div className={styles.adminOptions}>
                    {
                        email && <ItemListAdminOption email={email} />
                    }
                </div>
                <div className={[styles.itemSelection,styles.itemList].join(" ")}>

                    <div className={styles.count}>
                        Sr. No
                    </div>
                    
                    <div >
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