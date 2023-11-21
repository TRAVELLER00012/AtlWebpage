import styles from "../styles/auth.module.css"
import Link from "next/link";

const AuthCommander = () => {
  return (
    <>
      <div className={styles.mainPage}>
        <Link href={"/api/auth/signin"} className = {styles.button}><span>Login</span></Link>
        
        <Link href={"./register"}className = {styles.button}><span>Register</span></Link>
      </div>
    </>
  )
}

export default AuthCommander          