import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/authOptions"

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
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    const data = await prisma.issuedItems.delete({
        where:{
            id:parseInt(params.id)
        }
    })
    return NextResponse.json({msg:"DELETED"})
}