import styles from "../styles/issueitems.module.css"
import IssueItemCard from "../components/IssueItemCard";

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
                <IssueItemCard  count={1} name="D" quantity={1} issueDate="tommorroq331231231231231231827389172938712937819723912739812312312312w" returnDate="tomorrow"/>
            </div>
        </div>
    )
}

export default IssueItems;