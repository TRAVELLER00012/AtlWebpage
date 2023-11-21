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
    deleteIssuedItem(id:number){
        return apiClient.delete(DOMAIN+id)
    }
    addIssuedItem(item:Item){
        return apiClient.post(DOMAIN+item)
    }
    updateIssuedItem(item:Item){
        return apiClient.patch(DOMAIN+item.id,item)
    }
}

export default new IssuedItem();