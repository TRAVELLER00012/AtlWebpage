import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { ProjectInterface } from "@/app/services/projectService";

export async function GET(request:NextRequest){
    return NextResponse.json(await prisma.projects.findMany())
}

export async function POST(request: NextRequest){
    const body : ProjectInterface = await request.json();
    const data = await prisma.projects.create({
        data : {
            date : body.date,
            description : body.description,
            projectName : body.projectName,
            userId : body.userId
        }
    })
    return NextResponse.json({id:data.id})
}