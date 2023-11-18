import Image, { StaticImageData } from "next/image";
import styles from '../styles/card-styles.module.css'

interface Props{
    children:string,
    innerDes:string,
    img:StaticImageData
}

function Card({children,innerDes: rank,img: userImg}:Props){
    return(
        <div className={styles.card}>
        <Image src={userImg} alt="user logo" />
        <div className={styles.userDetails}>
          <h1>{children}</h1>
          <h5>{rank}</h5>
        </div>
      </div>
    )
}
export default Card;