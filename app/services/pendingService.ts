import apiClient from "./api-client";

const DOMAIN = "/pending/"

export interface Pending{
    id : number
    itemId : number
    userId : number
    quantity : number
    description : string
    dateOfReturn : string
    state : "Accepted" | "Rejected" | "Pending"
}

class ItemList{
    getAllItems(){
        const controller = new AbortController();
        const request = apiClient.get<Pending[]>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    getItem(id : number){
        return apiClient.get<Pending>(DOMAIN+id)
    }
    deleteItem(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addItem(item:Pending){
        return apiClient.post(DOMAIN,item)
    }
    updateItem(id:Number,item:Pending){
        return apiClient.put(DOMAIN+id,item)
    }
}

export default new ItemList();