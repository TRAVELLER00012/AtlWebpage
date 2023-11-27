import styles from "../styles/extra-user-info.module.css"
import users, { User } from "../services/users"
import { useEffect, useRef, useState } from "react"
import CloseIcon from  "@/public/images/close.png"
import UserIcon from "@/public/images/largeUser.png"
import Image from "next/image"
import AddIcon from "@/public/images/insert.png"
import RemoveIcon from "@/public/images/remove.png"
import EditIcon from "@/public/images/edit.png"
import projectService, { ProjectInterface } from "../services/projectService"
import { CanceledError } from "../services/api-client"
interface Props{
    id : number,
    currentUserId : number,
    showExtraInfo : (val : boolean) => void;
}

const UserExtraInfoCard = ({id , showExtraInfo} : Props) => {
    const [user,setUser] = useState<User>();
    const [projects,setProjects] = useState<ProjectInterface[]>([])
    
    const [showEdit,setShowEdit] = useState(false);
    const [showAdd,setShowAdd] = useState(false);
    const [showDelete,setShowDelete] = useState(false);

    const projectNameRef = useRef<HTMLInputElement>(null)
    const projectDateRef = useRef<HTMLInputElement>(null)
    const projectDescRef= useRef<HTMLTextAreaElement>(null)

    const projectNameEditRef = useRef<HTMLInputElement>(null)
    const projectDateEditRef = useRef<HTMLInputElement>(null)
    const projectDescEditRef= useRef<HTMLTextAreaElement>(null)
    const projectNameOptionsEditRef = useRef<HTMLSelectElement>(null)
    
    const projectNameDeleteRef = useRef<HTMLSelectElement>(null)

    useEffect(() =>{
        const request = users.getUser(id)
        const {request : projectRequests,cancel} = projectService.getAllProjects();
        request.then(res =>{
            setUser(res.data);
        })

        projectRequests.then(res =>{
            setProjects(res.data.filter(d => d.userId == id))
        }).catch(err =>{if (err == CanceledError) return;})
        return () => cancel();
    },[])
  return (
    <>
        <div className={styles.center}>
            <div className={styles.extraUserInfo}>
                <div className={styles.extraUserHeading}>
                    <h1>{user?.firstName} {user?.lastName}   <span className={styles.smallHeading}>{user?.class}-{user?.section}</span></h1>
                    <div className={styles.close}>
                        <Image  src={CloseIcon} alt="Close icon" onClick={() => showExtraInfo(false)}/>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.data}>
                        <div>
                            <span>Age</span>
                            <span>{user?.age}</span>     
                        </div>
                        <div>
                            <span>Years In Atl</span>
                            <span>{user?.number_of_years_in_atl}</span>     
                        </div>

                        <div>
                            <span>Phone Number</span>
                            <span>+91 {user?.phonenumber}</span>     
                        </div>

                        <div>
                            <span>Bus Number</span>
                            <span>{user?.bus_number}</span>     
                        </div>

                        <div>
                            <span>Email</span>
                            <span>{user?.email}</span>     
                        </div>

                        <div>
                            <span>User Type</span>
                            <span>{user?.user_type}</span>     
                        </div>
                    </div>
                    <Image alt="User icon" src={UserIcon} className={styles.userIcon} />
                </div>
                <div className={styles.projects}>
                    <div className={styles.heading}>
                        <h1>Projects</h1>
                        <div className={[styles.buttonGroup,styles.editInfoButtons].join(" ")}>
                            <Image src={EditIcon} alt="edit icon" onClick={() =>{setShowEdit(!showEdit)}}/>
                            <Image src={AddIcon} alt="add icon" onClick={() =>{setShowAdd(!showAdd)}}/>
                            <Image src={RemoveIcon} alt="remove icon" onClick={() =>{setShowDelete(!showDelete)}}/>
                        </div>
                    </div>
                
                    <div className={showAdd ? styles.showAdd : styles.hidden}>
                        <div className={styles.heading}>
                            <h1>Add Project</h1>
                        </div>
                        <div className={styles.form}>
                            <form onSubmit={(event) =>{
                                event.preventDefault()
                                if (projectNameRef.current && projectDateRef.current && projectDescRef.current){
                                    projectService.addProject({
                                        id : 0,
                                        date : projectDateRef.current.value,
                                        description : projectDescRef.current.value,
                                        projectName : projectNameRef.current.value,
                                        userId : id
                                    }).then(res =>{
                                        window.location.reload();
                                    })
                                }
                            }}>
                                <div className={styles.formMain}>
                                    <input type="text" placeholder="Project Name" required minLength={3} maxLength={100} ref={projectNameRef}/>
                                    <input type="date" required ref={projectDateRef}/>
                                    <textarea placeholder="Description" required minLength={10} maxLength={255} ref={projectDescRef}/>
                                    <div className={styles.buttons}>
                                        <button type="reset">Reset</button>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={showDelete ? styles.showDelete : styles.hidden}>
                        <div className={styles.heading}>
                            <h1>Delete Project</h1>
                        </div>
                        <div className={styles.form}>
                            <form onSubmit={(event) =>{
                                event.preventDefault()
                                if (projectNameDeleteRef.current){
                                    projectService.deleteProject(parseInt(projectNameDeleteRef.current.value))
                                }
                                window.location.reload()
                            }}>
                                <div className={styles.formMain}>
                                    <select required ref={projectNameDeleteRef}>
                                        <option key={""} value={""} disabled selected></option>
                                        {projects.map(p =>(
                                            <option key={p.id} value={p.id}>{p.projectName}</option>
                                        ))}
                                    </select>
                                    <div className={styles.buttons}>
                                        <button type="reset">Reset</button>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={showEdit ? styles.showEdit : styles.hidden}>
                        <div className={styles.heading}>
                            <h1>Edit Project</h1>
                        </div>
                        <div className={styles.form}>
                            <form onSubmit={(event) =>{
                                event.preventDefault()
                                if (projectNameEditRef.current && projectDateEditRef.current && projectDescEditRef.current && projectNameOptionsEditRef.current){
                                    projectService.updateProject(parseInt(projectNameOptionsEditRef.current.value),{
                                        date: projectDateEditRef.current.value,
                                        description : projectDescEditRef.current.value,
                                        projectName : projectNameEditRef.current.value,
                                        id : parseInt(projectNameOptionsEditRef.current.value),
                                        userId : id
                                    })
                                }
                                window.location.reload()
                            }}>
                                <div className={styles.formMain}>
                                    <select required ref={projectNameOptionsEditRef} onChange={(event) =>{
                                        if (event.target.value){
                                            const request = projectService.getProject(parseInt(event.target.value))
                                            request.then(res =>{
                                                if (projectNameEditRef.current && projectDateEditRef.current && projectDescEditRef.current){
                                                    projectNameEditRef.current.value = res.data.projectName 
                                                    projectDateEditRef.current.value = res.data.date
                                                    projectDescEditRef.current.value = res.data.description
                                                }
                                            }).catch(err =>{if (err == CanceledError) return;})
                                        }
                                        
                                    }}>
                                        <option key={""} value={""} disabled selected></option>
                                        {projects.map(p =>(
                                            <option key={p.id} value={p.id}>{p.projectName}</option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Project Name" required minLength={3} maxLength={100}  ref={projectNameEditRef}/>
                                    <input type="date" required  ref={projectDateEditRef}/>
                                    <textarea placeholder="Description" required minLength={10} maxLength={255} ref={projectDescEditRef}/>
                                    
                                    <div className={styles.buttons}>
                                        <button type="reset">Reset</button>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.projectDetails}>
                        {projects.map(p =>(
                            <div className={styles.project} key={p.id}>
                                <div>{p.projectName}</div>
                                <div>{p.description}</div>
                                <div>{p.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default UserExtraInfoCard