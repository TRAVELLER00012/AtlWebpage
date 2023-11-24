import { Domain } from "domain";
import apiClient from "./api-client";

const DOMAIN = "/attendence/"

export interface AttendenceProps{
    id? : number
    userId : number
    state : "Present" | "Absent"
    month : string
    year : number
    day : number
}

class Attendence{
    getAttendence(){
        const controller = new AbortController();
        const request = apiClient.get<AttendenceProps[]>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    getAttendenceUser(id:number){
        return apiClient.get<AttendenceProps[]>(DOMAIN+id)
    }
    deleteAttendence(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addAttendence(item:AttendenceProps){
        return apiClient.post(DOMAIN,item)
    }
    updateAttendence(item:AttendenceProps){
        return apiClient.patch(DOMAIN+item.id,item)
    }
}

export default new Attendence();