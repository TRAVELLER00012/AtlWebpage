'use client'
import Image from "next/image"
import MenuImg from "@/public/images/menu.png"
import NotificationImage from "@/public/images/notification.png"
import styles from "../styles/nav-bar.module.css"
import NavLogo from "@/public/images/arduino.png"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useAuthenticator from "../hook/useAuthticator"
import users from "../services/users"
import NotificationComponent from "./NotificationComponent"
import pendingService from "../services/pendingService"
import itemListService from "../services/itemListService"
import { CanceledError } from "../services/api-client"
import notificationService from "../services/notificationService"
export interface NotificationData {
  id : number,
  otherID? : number,
  userName?: string,
  itemName? : string,
  quantity? : number,
  description?:string,
  state : "Pending" | "Accepted" | "Rejected" | "ModReview" | "Return"
}
const NavBar = () => {
  const [visible, setVisibility] = useState(false);
  const [allowMod, setAllowMod] =  useState(false)
  const [showNotification,setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState<NotificationData[]>([]);

  const onMenuClick = () =>{
    setVisibility(!visible)
  }
  const {status,data} = useSession();
  const {email,id} = useAuthenticator();
  const currentDate = new Date();
  useEffect(() =>{
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('userEmail');
      if (storedEmail){
        const {request : userRequest , cancel} = users.getAllUser();
        userRequest.then(res =>{
          res.data.map(d =>{
            if (d.email == storedEmail){
              if (d.user_type == "Moderator") setAllowMod(true)
              else setAllowMod(false)
              const request = users.getUser(d.id)
              const {request: notificationRequest, cancel : notificationCancel} = notificationService.getAllNotifications();
        
        
              let temp : NotificationData[] = []
              const {request : pendingRequest,cancel} = pendingService.getAllItems();
              
              pendingRequest.then(res =>{
                res.data.map(d =>{
                  if (d.userId == id){            
                    let finalData : NotificationData = {
                      id : 0,
                      itemName : "",
                      quantity : 0,
                      state : "Pending",
                      userName : ""
                    }
                    const item = itemListService.getItem(d.itemId)
                    request.then(u => {
                      finalData.userName = u.data.firstName + " " + u.data.lastName
                      finalData.id = d.id;
                      finalData.quantity = d.quantity;
                      finalData.state = d.state;
                      item.then(i => {
                        finalData.itemName = i.data.name
                        temp.push(finalData)
                      }).catch(err => {if (err == CanceledError) return;})
                    })
                    .catch(err => {if(err == CanceledError) return;})  
        
        
                  }else{
                    request.then(res =>{
                      if (res.data.user_type == "Moderator" && d.state == "Pending"){
                        const item = itemListService.getItem(d.itemId)
                        item.then(i =>{
                          let finalData : NotificationData = {
                            id : 0,
                            itemName : "",
                            quantity : 0,
                            state : "ModReview",
                            userName : "",
                            description:""
                          }
                          finalData.itemName = i.data.name
                          finalData.quantity = d.quantity
                          finalData.description = d.description
                          let userReq = users.getUser(d.userId)
                          userReq.then(userRes =>{
                            finalData.userName = userRes.data.firstName + " " + userRes.data.lastName
                            finalData.id = d.id
                            temp.push(finalData)
                          })
                          }).catch(err => {if (err == CanceledError) return;})
                      }
                    })
                  }
                })
              }).catch(err => {
                if (err == CanceledError) return;
              })
              const user = users.getUser(d.id)
              user.then(userRes =>{
                notificationRequest.then(res =>{
                    res.data.map(d =>{
                      if (d.access == "Moderators"){
                        let newData : NotificationData = {
                          id : d.issuedItemId,
                          state : d.notificationType,
                          description : d.description,
                          otherID: d.id
                        }
                        if (userRes.data.user_type == "Moderator"){
                          temp.push(newData)
                          setNotificationData(temp)
                        }else{
                          setNotificationData(temp)
                        }
                      }
                    })
                    setNotificationData(temp)
                  }).catch(err => {
                    if (err == CanceledError) return;
                  })
                  
              })
              return;
            }
          })
        })
      }
    }    
  },[id,email])
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.heading}>
          <Image src={NavLogo} alt="navbar logo" className={styles.logo}/>
          <h1>ATL</h1>
        </div>
        <ul>
              <li><Link href={"."}>Home</Link></li>
              {allowMod && <li><Link href={"./attendenceAuth"}>Attendence</Link></li>}
              <li><Link href={"./itemlist"}>Item List</Link></li>
              <li><Link href={"./issueitems"}>Issue Items</Link></li>
              <li><Link href={"./paths"}>Paths</Link></li>
              <li><Link href={"./profile"}>Profile</Link></li>
              {status === "authenticated" && <li><Link href={"/api/auth/signout"}>Sign out</Link></li>}
        </ul>
        <Image src={NotificationImage} alt="notification img" onClick={() => setShowNotification(!showNotification)} className={styles.notification}/>
        <Image src={MenuImg} alt="Menu Bar img" className={styles.menu} onClick={() => onMenuClick()}/>
      </div>
      <div className={visible ? "" : styles.hidden }>
        <div className={styles.mobileNav}>
          <ul>
                <li><Link href={"."}>Home</Link></li>
                {allowMod && <li><Link href={"./attendenceAuth"}>Attendence</Link></li>}
                <li><Link href={"./itemlist"}>Item List</Link></li>
                <li><Link href={"./issueitems"}>Issue Items</Link></li>
                <li><Link href={"./paths"}>Paths</Link></li>
                <li><Link href={"./profile"}>Profile</Link></li>
                <li onClick={() => setShowNotification(!showNotification)}>Notifications</li>
                {status === "authenticated" && <li><Link href={"/api/auth/signout"}>Sign out</Link></li>}
          </ul>
        </div>
      </div>
      {showNotification && <NotificationComponent data={notificationData} setVisbility={setShowNotification }/>}
    </>

  )
}

export default NavBar