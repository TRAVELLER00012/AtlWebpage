import styles from "../styles/issueitems.module.css"
import IssueItemList from "../components/IssueItemList";

function IssueItems(){

    return (
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
                <IssueItemList />
            </div>
        </div>
    )
}

export default IssueItems;