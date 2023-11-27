import { Pending } from "@/app/services/pendingService";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";

export async function GET(request : NextRequest){
    const data = await prisma.issuedItemsPending.findMany()
    return NextResponse.json(data)
}

export async function POST(request : NextRequest){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    const body : Pending= await request.json()
    const data = await prisma.issuedItemsPending.create({
        data:{
            userId : body.userId,
            itemId : body.itemId,
            dateOfReturn: body.dateOfReturn,
            description : body.description,
            quantity : body.quantity,
            state : body.state,
        }
    })
    return NextResponse.json({id : data.id})
}