'use client'
import styles from "../styles/extra-item-info.module.css"
import itemListService, { Item } from "../services/itemListService"
import { useEffect, useState } from "react"
import CloseIcon from "@/public/images/close.png"
import Image from "next/image"
interface Props{
  id : number,
  visibility : (visible : boolean) => void;
}

const ExtraItemInfo = ({id,visibility}:Props) => {
  const [itemData,setItemData] = useState<Item>()
  useEffect(() => {
    const request = itemListService.getItem(id)
    request.then(res => {
      setItemData(res.data)
      console.log(res.data);
    })
  },[])
  return (
        <div className={styles.extraInfo}>
          <div className={styles.heading}>
              <h1>{itemData?.name}</h1>
              <Image src={CloseIcon} alt="Close icon" onClick={() => visibility(false)} className={styles.close}/>
          </div>
          <div className={styles.content}>
              <div className={styles.data}>
                <div>
                  <span className={styles.span}>Quantity</span>
                  <span className={styles.span}>{itemData?.quantity}</span>
                </div>
                <div>
                  <span className={styles.span}>Issuable</span>
                  <span className={itemData?.issuable ? styles.greenBg : styles.redBg}>{itemData?.issuable == true ? "Yes" : "No"}</span>
                </div>
              </div>
          </div>
        </div>
    )
}

export default ExtraItemInfo