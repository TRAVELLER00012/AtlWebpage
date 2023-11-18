'use client'
import styles from "./styles/homepage.module.css"
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from "./components/Card";

import UserLogo from "@/public/images/profile.png"
import ItemList from "@/public/images/task-list.png"
import IssueItem from "@/public/images/issue-item.png"
import ReturnItem from "@/public/images/return.png"

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  scales:{
    y:{
      ticks:{
        color:'rgb(255,255,255)'
      }
    },
    x:{
      ticks:{
        color:'rgb(255,255,255)'
      }
    }
  }
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
  labels,
  datasets: [
    {
      label: 'Present',
      data: [15,13,4,18,17,18,18,8],
      borderColor: 'rgb(0, 255, 0)',
      backgroundColor: 'rgba(0, 255, 0, 0.5)',
    },
    {
      label: 'Absent',
      data: [3,3,3,5,3,2,1],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};
class Person{
  constructor(public firstName:string, public rank:string){}
}
const users = [new Person("Daksh","Teacher",),
new Person("Daksh","Devolper"),
new Person("Daksh","Student"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper"),
new Person("Daksh","Devolper")]
function Home(){

  return (
    <>
      <div className={styles.headings}>
        <h3>Hi Daksh</h3>
        <h1>Welcome Home</h1>
      </div>
      
      <Line options={options} data={data} />

      <div className={styles.currentPeople}>
        <h1 className={styles.mainHeading}>
          Current People Enrolled in ATL
        </h1>
        <div className={styles.users}>
          {users.map(user => (
            <Card img={UserLogo} innerDes={user.rank}>{user.firstName}</Card>
          ))}
        </div>
      </div>


      <div className={styles.shortCutMenus}>
        <h1>Check out some of the Features!</h1>
        <div className={styles.shortcuts}>
          <div className={styles.itemList}>
              <Card img={ItemList} innerDes={"Check out the items we have!"}>Item List</Card>
              <Card img={IssueItem} innerDes={"Issue an Item from atl lab!"}>Issue An Item</Card>
              <Card img={ReturnItem} innerDes={"You have nothing to return yet!"}>Return An Item</Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;