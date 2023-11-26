import apiClient from "./api-client";

const DOMAIN = "/notification/"

export let notifications = ["Return"]
export interface Notification{
    id : number,
    issuedItemId : number
    description : string
    access : "All" | "Moderators"
    notificationType : "Return"
}
class Notifications{
    getAllNotifications(){
        const controller = new AbortController();
        const request = apiClient.get<Notification[]>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    getNotification(id : number){
        return apiClient.get<Notification>(DOMAIN+id)
    }
    deleteNotification(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addNotification(item:Notification){
        return apiClient.post(DOMAIN,item)
    }
    updateNotification(id:Number,item:Notification){
        return apiClient.put(DOMAIN+id,item)
    }
}

export default new Notifications();