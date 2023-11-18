import Image from "next/image"

import styles from "../styles/nav-bar.module.css"
import NavLogo from "@/public/images/arduino.png"
import Link from "next/link"

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.heading}>
        <Image src={NavLogo} alt="navbar logo" className={styles.logo}/>
        <h1>ATL</h1>
      </div>
      <ul className="items">
        <li><Link href={"."}>Home</Link></li>
        <li><Link href={"./itemlist"}>Item List</Link></li>
        <li><Link href={"./issueitems"}>Issue Items</Link></li>
        <li>Paths</li>
        <li>Profile</li>
      </ul>
    </div>
  )
}

export default NavBar