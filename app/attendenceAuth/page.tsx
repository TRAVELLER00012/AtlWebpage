'use client'
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/attendence.module.css"
import users from "../services/users";
import { CanceledError } from "../services/api-client";
import attendenceService, { AttendenceProps } from "../services/attendenceService";
function AttendenceAuth(){
    const [user,setUser] = useState<{id:number; firstName:string; lastName:string}[]>()
    const [presentSelected,setPresentSelect] = useState(true)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    const specialMonths = ["January", "March", "May", "July", "August", "October", "December"];
    let currentDate = new Date();

    const userInsertSelect = useRef<HTMLSelectElement>(null);
    const userEditSelect = useRef<HTMLSelectElement>(null);
    const monthEditSelect = useRef<HTMLSelectElement>(null);
    let days : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    useEffect(() =>{
        const {request : userRequest, cancel} = users.getAllUser()
        userRequest.then(res =>{
            setUser(res.data)
        }).catch(err =>{
            if (err == CanceledError) return;
        })
        return () => cancel()
    },[])

    return(
        <>
            <NavBar />
            <div className={styles.main}>
                <div className={styles.insert}>
                    <div className={styles.heading} >
                        <h1>Insert</h1>
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) =>{
                            event.preventDefault()
                            if (userInsertSelect.current){
                                const newData : AttendenceProps = {
                                    userId : parseInt(userInsertSelect.current.value),
                                    day : currentDate.getDay(),
                                    month : months[currentDate.getMonth()],
                                    year : currentDate.getFullYear(),
                                    state : presentSelected ? "Present" : "Absent"
                                }
                                attendenceService.addAttendence(newData)

                            }
                        }}>
                            <select id="user" ref={userInsertSelect}>
                                {user?.map(u =>(
                                   <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option> 
                                ))}
                            </select>
                            <div className={styles.date}>
                                <div>
                                    <div>
                                        Date
                                    </div>
                                    <div>
                                        {currentDate.getDay()}
                                    </div>
                                </div>
                                <div>
                                    <div>Month</div>
                                    <div>{months[currentDate.getMonth()]}</div>
                                </div>
                                <div>
                                    <div>Year</div>
                                    <div>{currentDate.getFullYear()}</div>
                                </div>
                                <div>
                                    <div>Present / Absent</div>
                                    <div>{presentSelected ? "Present" : "Absent"}</div>
                                </div>
                            </div>    
                            <div className={styles.state}>
                                <div onClick={() => setPresentSelect(true)}>Present</div>
                                <div onClick={() => setPresentSelect(false)}>Absent</div>
                            </div>
                            <button type="submit" className={styles.submit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttendenceAuth;