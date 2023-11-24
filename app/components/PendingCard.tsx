import { useRef } from "react"
import pendingService from "../services/pendingService"
import styles from "../styles/pending-card.module.css"

interface Props{
    max : number,
    itemId : number,
    userId : number,
    cancel : () => void,
    submit : () => void
}

const PendingCard = ({max,cancel,itemId,submit,userId} : Props) => {
    const quantity = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const date = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <div className={styles.heading}>
                <h1>Information</h1>
            </div>
            <div className={styles.form}>
                <form onSubmit={(event) =>{
                    console.log("TEST");
                    
                    event.preventDefault()
                    if (quantity.current && description.current && date.current){
                        const r=pendingService.addItem({
                            id : 0,
                            dateOfReturn : date.current.value,
                            description : description.current.value,
                            itemId : itemId,
                            quantity : parseInt(quantity.current.value),
                            state : "Pending",
                            userId : userId
                        })
                        
                    }
                }}>
                    <input type="number" placeholder="Quantity" required min={1} max={max} ref={quantity}/>
                    <br />
                    <textarea placeholder="Description" maxLength={255} ref={description}/>
                    <input type="date" ref={date}/>
                    <div className={styles.buttons}>
                        <button type="submit">Submit</button>
                        <button type="reset" onClick={() => cancel()} >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PendingCard