import styles2 from "../styles/issueitems.module.css"
import styles from "../styles/item-list.module.css"
import Warning from "@/public/images/warning.png"
import IssueItemCard from "../components/IssueItemCard";

function IssueItems(){
    // return (
    //     <div className={styles2.alert}>
    //         <Image src={Warning} alt="Warning sign"/>
    //         <p>You have no items issued!</p>
    //     </div>
    // )
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
                

            </div>
            <div className={styles.items}>
                <IssueItemCard  count={1} name="D" quantity={1}/>
            </div>
        </div>
    )
}

export default IssueItems;