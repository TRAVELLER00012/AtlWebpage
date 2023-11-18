import Image from "next/image"

import styles from "../styles/nav-bar.module.css"
import NavLogo from "@/public/images/arduino.png"

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.heading}>
        <Image src={NavLogo} alt="navbar logo" className={styles.logo}/>
        <h1>ATL</h1>
      </div>
      <ul className="items">
        <li>Home</li>
        <li>Item List</li>
        <li>Issue Items</li>
        <li>Return Item</li>
        <li>Paths</li>
        <li>Profile</li>
      </ul>
    </div>
  )
}

export default NavBar