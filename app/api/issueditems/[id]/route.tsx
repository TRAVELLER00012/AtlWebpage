import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

interface Props{
    params:{
        id:string
    }
}

export async function GET(request:NextRequest, {params}: Props) {
    const data = await prisma.issuedItems.findFirst({
        where: {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(data)
}

export async function DELETE(request:NextRequest,{params} : Props){
    const data = await prisma.issuedItems.delete({
        where:{
            id:parseInt(params.id)
        }
    })
    return NextResponse.json({msg:"DELETED"})
}