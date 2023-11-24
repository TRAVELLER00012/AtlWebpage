'use client'
import Image from "next/image"
import MenuImg from "@/public/images/menu.png"

import styles from "../styles/nav-bar.module.css"
import NavLogo from "@/public/images/arduino.png"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useAuthenticator from "../hook/useAuthticator"
import users from "../services/users"

const NavBar = () => {
  const [visible, setVisibility] = useState(false);
  const [allowMod, setAllowMod] =  useState(false)
  const onMenuClick = () =>{
    setVisibility(!visible)
  }
  const {status,data} = useSession();
  const {email,id} = useAuthenticator();
  useEffect(() =>{
    if(id){
      const request = users.getUser(id)
      request.then(res =>{
        if (res.data.user_type == "Moderator") setAllowMod(true)
        else setAllowMod(false)
      })
    }
  },[id])
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
              <li>Profile</li>
              {status === "authenticated" && <li><Link href={"/api/auth/signout"}>Sign out</Link></li>}
         
        </ul>
        <Image src={MenuImg} alt="Menu Bar img" className={styles.menu} onClick={() => onMenuClick()}/>
      </div>
      <div className={visible ? "" : styles.hidden }>
        <div className={styles.mobileNav}>
          <ul>
                <li><Link href={"."}>Home</Link></li>
                <li><Link href={"./itemlist"}>Item List</Link></li>
                <li><Link href={"./issueitems"}>Issue Items</Link></li>
                <li><Link href={"./paths"}>Paths</Link></li>
                <li>Profile</li>
                {status === "authenticated" && <li><Link href={"/api/auth/signout"}>Sign out</Link></li>}
          </ul>
        </div>
      </div>
    </>

  )
}

export default NavBar