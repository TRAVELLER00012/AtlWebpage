import { ProjectInterface } from "@/app/services/projectService";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";

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
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    const data = await prisma.projects.delete({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json({msg:"Success"})
}

export async function PATCH(requst: NextRequest, {params} : Props){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
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