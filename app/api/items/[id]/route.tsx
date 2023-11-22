import itemListService, { Item } from "@/app/services/itemListService"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

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
    const item = prisma.items.findFirst({where:{id:parseInt(params.id)}})
    await prisma.items.delete({
        where:{
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(item)
}

export async function PUT(request : NextRequest, {params} : Props){
    let newData : Item = await request.json()
    let item = await prisma.items.update({
        where:{
            id: parseInt(params.id)
        },
        data: newData
    })
    return NextResponse.json({id:item.id})
}