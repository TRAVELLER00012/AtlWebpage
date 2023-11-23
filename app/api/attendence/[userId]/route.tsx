import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

interface Props{
    params:{
        userId:string
    }
}

export async function GET(request:NextRequest,{params} : Props){
    const data = await prisma.attendence.findMany({
        where:{
            userId: parseInt(params.userId)
        }
    })
    return NextResponse.json(data)
}