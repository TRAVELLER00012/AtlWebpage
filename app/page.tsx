import styles from "./styles/homepage.module.css"
import Card from "./components/Card";
import Link from "next/link";
import ItemList from "@/public/images/task-list.png"
import IssueItem from "@/public/images/issue-item.png"
import ReturnItem from "@/public/images/return.png"
import AttendenceGraph from "./components/AttendenceGarph";
import UserList from "./components/UserList";
import EnsureAuthentication from "./components/EnsureAuthentication";

function Home(){

  return (
    <>
      <EnsureAuthentication />
      <div className={styles.headings}>
        <h3>Hi User!</h3>
        <h1>Welcome Home</h1>
      </div>
      <AttendenceGraph />


      <div className={styles.currentPeople}>
        <h1 className={styles.mainHeading}>
          Current People Enrolled in ATL
        </h1>
        <div className={styles.users}>
          <UserList />
        </div>
      </div>


      <div className={styles.shortCutMenus}>
        <h1>Check out some of the Features!</h1>
        <div className={styles.shortcuts}>
          <div className={styles.itemList}>
              <Card img={ItemList} innerDes={"Check out the items we have!"}><Link href={"./itemlist"}>Item List</Link></Card>
              <Card img={IssueItem} innerDes={"Issue an Item from atl lab!"}><Link href={"./issueitems"}>Issue An Item</Link></Card>
              <Card img={ReturnItem} innerDes={"You have nothing to return yet!"}><Link href={"./issueitems"}>Return An Item</Link></Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;