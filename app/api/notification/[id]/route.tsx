import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";

interface Props{
    params:{
        id:string
    }
}

export async function GET(request : NextRequest , {params : {id}} : Props){
    const data = await prisma.notification.findMany({
        where:{
            id:parseInt(id)
        }
    });
    return NextResponse.json(data)
}

export async function DELETE(request : NextRequest, {params} : Props){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    const data = await prisma.notification.delete({
        where:{
            id : parseInt(params.id)
        }
    })
    return NextResponse.json({msg:"success"})
}