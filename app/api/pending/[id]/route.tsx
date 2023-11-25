import { Pending } from "@/app/services/pendingService";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server"

interface Props{
    params:{
        id:string
    }
}
export async function GET(request : NextRequest, {params} : Props){
    const data = await prisma.issuedItemsPending.findFirst({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(data)
}
export async function PUT(request:NextRequest,{params}:Props){
    let body : Pending = await request.json();
    let item = await prisma.issuedItemsPending.update({
        where:{
            id:parseInt(params.id)
        },
        data: body
    })
    return NextResponse.json({id: item.id})
}