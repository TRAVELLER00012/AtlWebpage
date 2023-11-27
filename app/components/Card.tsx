'use client'
import Image, { StaticImageData } from "next/image";
import styles from '../styles/card-styles.module.css'
import {ReactNode, useState } from "react";
import UserExtraInfoCard from "./UserExtraInfoCard";
import useAuthenticator from "../hook/useAuthticator";

interface Props{
    heading:ReactNode,
    id:number,
    innerDes:string,
    img:StaticImageData,
    userInfo:boolean
}

function Card({heading,id,innerDes: rank,img: userImg,userInfo}:Props){
    const {email,id : userId} = useAuthenticator();
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    const showExtraInformation = (showExtra : boolean, showUser : boolean) => {
      if (showExtra && userId){
        if (showUser) return <UserExtraInfoCard id={id} key={id} currentUserId={userId} showExtraInfo={setShowExtraInfo}/>
      }
    }
    return(
      <>

        <div className={styles.card} onClick={() => {
          setShowExtraInfo(!showExtraInfo)          
        }}>
          <Image src={userImg} alt="user logo" />
          <div className={styles.userDetails}>
            <h1>{heading}</h1>
            <h5>{rank}</h5>
          </div>
        </div>
        {showExtraInformation(showExtraInfo,userInfo)}

      </>
    )
}
export default Card;