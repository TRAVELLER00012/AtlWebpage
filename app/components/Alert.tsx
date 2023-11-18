import styles from "../styles/alert.module.css"
import Warning from "@/public/images/warning.png"
import Image from "next/image";
import { ReactNode } from "react";

interface Props{
    children:ReactNode;
}
function Alert({children}:Props){
    return (
        <div className={styles.alert}>
            <Image src={Warning} alt="Warning sign"/>
            <p>{children}</p>
        </div>
    )
}
export default Alert;