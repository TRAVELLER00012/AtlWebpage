import apiClient from "./api-client";

const DOMAIN = "/items/"

export interface Item{
    id : number
    name : string
    quantity : number
    issuable : boolean
}

class ItemList{
    getAllItems(){
        const controller = new AbortController();
        const request = apiClient.get<Item[]>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    getItem(id : number){
        return apiClient.get<Item>(DOMAIN+id)
    }
    deleteItem(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addItem(item:Item){
        return apiClient.post(DOMAIN,item)
    }
    updateItem(id:Number,item:Item){
        return apiClient.put(DOMAIN+id,item)
    }
}

export default new ItemList();