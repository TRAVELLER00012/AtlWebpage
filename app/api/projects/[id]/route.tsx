import { ProjectInterface } from "@/app/services/projectService";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params:{
        id:string
    }
}

export async function GET(request: NextRequest, {params} : Props){
    const data = await prisma.projects.findFirst({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(data)
}
export async function DELETE(request: NextRequest, {params} : Props){
    const data = await prisma.projects.delete({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json({msg:"Success"})
}

export async function PATCH(requst: NextRequest, {params} : Props){
    const body : ProjectInterface = await requst.json()
    const data = await prisma.projects.update({
        where : {
            id : parseInt(params.id)
        },
        data:{
            date: body.date,
            description: body.description,
            projectName : body.projectName,
        }
    })
    return NextResponse.json({id:data.id})
}