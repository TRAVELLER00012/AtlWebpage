import apiClient from "./api-client";

const DOMAIN = "/users/"

export interface User{
    id : number
    firstName : string
    lastName : string
    age : number
    number_of_years_in_atl : number
    phonenumber : number
    bus_number : string
    email : string
    class : number
    section : string
    user_type : "Student" | "Teacher" | "Moderator"
}

class Users{
    getAllUser(){
        const controller = new AbortController();
        const request = apiClient.get<User[]>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    getUser(id : number){
        const request = apiClient.get<User>(DOMAIN+id)
        return request;
    }
    deleteUser(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    updateUser(item:User){
        return apiClient.patch(DOMAIN+item.id,item)
    }
}

export default new Users();