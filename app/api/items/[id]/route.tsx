import itemListService from "@/app/services/itemListService"
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
