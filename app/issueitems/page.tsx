'use client'
import styles from "../styles/issueitems.module.css"
import IssueItemList from "../components/IssueItemList";
import EnsureAuthentication from "../components/EnsureAuthentication";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

function IssueItems(){
    const [email,setEmail] = useState<string>()
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedEmail = sessionStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail)
        }
      }
    }, []);
    return (
       <>
            <EnsureAuthentication />
            <div className={styles.main}>
            <div className={styles.itemSelection}>
                <div>
                    Sr. No
                </div>
                
                <div>
                    Name
                </div>
                
                <div className={styles.quantity}>
                    Quantity
                </div>
                <div className={styles.issueDate}>
                    Date Issued 
                </div>
                <div className={styles.returnDate}>
                    Return Date
                </div>
                <div className={styles.remove}>
                    Return
                </div>

            </div>
            <div className={styles.items}>
                {
                    email ? <IssueItemList email={email} /> : <p>Not Authenticated</p>
                }
            </div>
        </div>
       </>
    )
}

export default IssueItems;