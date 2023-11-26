'use client'
import styles from "../styles/item-list.module.css"
import ItemListComponent from "../components/ItemListComponent"
import EnsureAuthentication from "../components/EnsureAuthentication"
import ItemListAdminOption from "../components/ItemListAdminOption"

import { useEffect, useState } from "react"
import users from "../services/users"

function ItemList(){    
    const [email,setEmail] = useState<string>()
    const [id,setId] = useState<number>()
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedEmail = sessionStorage.getItem('userEmail');
        const userID = sessionStorage.getItem('userId')
        if (storedEmail) {
            setEmail(storedEmail)
        }
        if (userID){
            setId(parseInt(userID))
        }
      }
    }, []);

    return (
        <>

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
                    {id && <ItemListComponent userId={id} />}
                </div>
            </div>
        </>
    )
}

export default ItemList
