'use client'
import styles from "../styles/extra-user-info.module.css"
import users, { User } from "../services/users"
import { useEffect, useState } from "react"
import CloseIcon from  "@/public/images/close.png"
import UserIcon from "@/public/images/largeUser.png"
import Image from "next/image"
interface Props{
    id : number,
    showExtraInfo : (val : boolean) => void;
}

const UserExtraInfoCard = ({id , showExtraInfo} : Props) => {
    const [user,setUser] = useState<User>();
    useEffect(() =>{
        const request =  users.getUser(id)
        request.then(res =>{
            setUser(res.data);
        })
    },[])
  return (
    <div className={styles.extraUserInfo}>
        <div className={styles.heading}>
            <h1>{user?.firstName} {user?.lastName}   <span className={styles.smallHeading}>{user?.class}-{user?.section}</span></h1>
            <div className={styles.close}>
                <Image  src={CloseIcon} alt="Close icon" onClick={() => showExtraInfo(false)}/>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.data}>
                <div>
                    <span>Age</span>
                    <span>{user?.age}</span>     
                </div>
                <div>
                    <span>Years In Atl</span>
                    <span>{user?.number_of_years_in_atl}</span>     
                </div>

                <div>
                    <span>Phone Number</span>
                    <span>+91 {user?.phonenumber}</span>     
                </div>

                <div>
                    <span>Bus Number</span>
                    <span>{user?.bus_number}</span>     
                </div>

                <div>
                    <span>Email</span>
                    <span>{user?.email}</span>     
                </div>

                <div>
                    <span>User Type</span>
                    <span>{user?.user_type}</span>     
                </div>
            </div>
            <Image alt="User icon" src={UserIcon} />
        </div>
  </div>
  )
}

export default UserExtraInfoCard