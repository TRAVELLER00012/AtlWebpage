import apiClient from "./api-client";

const DOMAIN = "/items/"

export interface User{
    id : number
    firstName : string
    lastName : string
    age : number
    number_of_years_in_atl : boolean
    phonenumber : number
    bus_number : string
    email : string
    class : string
    section : string
    user_type : "Student" | "Teacher" | "Expert"
}

class ItemList{
    getAllUser(){
        const controller = new AbortController();
        const request = apiClient.get<User>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    deleteUser(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addUser(item:User){
        return apiClient.post(DOMAIN+item)
    }
    updateUser(item:User){
        return apiClient.patch(DOMAIN+item.id,item)
    }
}

export default new ItemList();