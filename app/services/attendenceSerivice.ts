import apiClient from "./api-client";

const DOMAIN = "/attendence/"

export interface Attendence{
    id : number
    userId : number
    firstName : string
    lastName : string
    state : "Present" | "Absent"
}

class IssuedItem{
    getAttendence(){
        const controller = new AbortController();
        const request = apiClient.get<Attendence>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    deleteAttendence(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addAttendence(item:Attendence){
        return apiClient.post(DOMAIN+item)
    }
    updateAttendence(item:Attendence){
        return apiClient.patch(DOMAIN+item.id,item)
    }
}

export default new IssuedItem();