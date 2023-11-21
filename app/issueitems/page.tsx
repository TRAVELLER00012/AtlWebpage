'use client'
import styles from "../styles/issueitems.module.css"
import IssueItemList from "../components/IssueItemList";
import EnsureAuthentication from "../components/EnsureAuthentication";
import NavBar from "../components/NavBar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function IssueItems(){
    const [email,setEmail] = useState<string>()
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail)
        }
      }
    }, []);
    return (
       <>
            <NavBar />
            <EnsureAuthentication />
            <div className={styles.main}>
            <div className={styles.itemSelection}>
                <div>
                    Sr. No
                </div>
                
                <div>
                    Name
                </div>
                
                <div>
                    Quantity
                </div>
                <div>
                    Date Issued 
                </div>
                <div>
                    Return Date
                </div>
                <div>
                    Return
                </div>

            </div>
            <div className={styles.items}>
                <IssueItemList email={email!} />
            </div>
        </div>
       </>
    )
}

export default IssueItems;