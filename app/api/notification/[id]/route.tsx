import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
    const data = await prisma.notification.delete({
        where:{
            id : parseInt(params.id)
        }
    })
    return NextResponse.json({msg:"success"})
}