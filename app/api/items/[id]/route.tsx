import itemListService, { Item } from "@/app/services/itemListService"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/authOptions"

interface Props{
    params:{
        id : string
    }
}


export async function GET(request : NextRequest, {params} : Props){
    const data = await prisma.items.findFirst({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(data)
}

export async function DELETE(request : NextRequest, {params} : Props){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    const item = prisma.items.findFirst({where:{id:parseInt(params.id)}})
    await prisma.items.delete({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(item)
}

export async function PUT(request : NextRequest, {params} : Props){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    let newData : Item = await request.json()
    let item = await prisma.items.update({
        where:{
            id: parseInt(params.id)
        },
        data: newData
    })
    return NextResponse.json({id:item.id})
}