
import apiClient from "./api-client";

export interface ProjectInterface{
    id : number,
    userId : number,
    projectName : string,
    date : string,
    description: string
}

const DOMAIN = "/projects/"

class Projects{
    getAllProjects(){
        const controller = new AbortController();
        const request = apiClient.get<ProjectInterface[]>(DOMAIN,{signal: controller.signal})
        return {request, cancel : () => controller.abort()}
    }
    getProject(id:number){
        return apiClient.get<ProjectInterface>(DOMAIN+id)
    }
    addProject(item:ProjectInterface){
        return apiClient.post<ProjectInterface>(DOMAIN,item)
    }
    updateProject(id:number, item : ProjectInterface){
        return apiClient.patch(DOMAIN+id, item)
    }
    deleteProject(id:number){
        return apiClient.delete(DOMAIN+id)
    }
}
export default new Projects();