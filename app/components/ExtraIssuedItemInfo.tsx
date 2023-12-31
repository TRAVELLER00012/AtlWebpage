import { useEffect, useState } from 'react'
import styles from '../styles/extra-issused-items.module.css'
import issuedItemService, { Item as IssuedItem} from '../services/issuedItemService'
import { Item } from '../services/itemListService'
import itemListService from '../services/itemListService'
import users, { User } from '../services/users'
import Image from 'next/image'
import CloseIcon from "@/public/images/close.png"
import LoadingCircle from './LoadingCircle'

interface Props{
    id : number,
    visibility : (val : boolean) => void
    returnFun : () => void,
    loading: boolean
}

const ExtraIssuedItemInfo = ({id,visibility,returnFun, loading} : Props) => {
    const [issuedItem,setIssuedItem] = useState<IssuedItem>();
    const [item,setItem] = useState<Item>();
    const [user,setUser] = useState<User>();
    useEffect(() =>{
        const issuedReqest=  issuedItemService.getItem(id)
        issuedReqest.then(res =>{
            setIssuedItem(res.data) 
            const itemRequest = itemListService.getItem(res.data.itemId)
            itemRequest.then(res =>{
                setItem(res.data)
            })
            const userRequest = users.getUser(res.data.userId)
            userRequest.then(res =>{
                setUser(res.data)
            })
        })



    },[])
  return (
    <div className={styles.extraInfo}>
        <div className={styles.heading}>
            <div>
                <h1>{item?.name}</h1>
                {loading && <LoadingCircle />}
            </div>
            <Image src={CloseIcon} alt="Close icon" className={styles.close} onClick={() => visibility(false)}/>
        </div>
        <div className={styles.content}>
            <div>
                <span>Quantity Issued</span>
                <span>{issuedItem?.quantity}</span>
            </div>

            <div>
                <span>Date of Issue</span>
                <span>{issuedItem?.dateOfIssue}</span>
            </div>

            <div>
                <span>Date of Return</span>
                <span>{issuedItem?.dateOfReturn}</span>
            </div>

            <div>
                <span>User Name</span>
                <span>{user?.firstName} {user?.lastName}</span>
            </div>

            <div>
                <span>Class Section</span>
                <span>{user?.class}-{user?.section}</span>
            </div>
            <div className={styles.removeButton}>
                <button className={styles.remove} onClick={() => returnFun()}>Return</button>
            </div>
        </div>
    </div>
  )
}

export default ExtraIssuedItemInfo