import prisma from "@/prisma/client";
import apiClient from "./api-client";

const DOMAIN = "/issueditems/"

export interface Item{
    id : number
    itemId : number
    userId : number
    itemName : string
    quantity : number
    dateOfIssue : string
    dateOfReturn : string
}

class IssuedItem{
    getAllItems(){
        const controller = new AbortController();
        const request = apiClient.get<Item[]>(DOMAIN,{signal:controller.signal})
        return {request,cancel : () => controller.abort()}
    }
    getItem(id : number){
        return apiClient.get<Item>(DOMAIN+id)
    }
    addIssuedItem(item:Item){
        return apiClient.post(DOMAIN,item)
    }
    deleteIssuedItem(id:number){
        return apiClient.delete(DOMAIN+id)
    }

    updateIssuedItem(item:Item){
        return apiClient.patch(DOMAIN+item.id,item)
    }
}

export default new IssuedItem();