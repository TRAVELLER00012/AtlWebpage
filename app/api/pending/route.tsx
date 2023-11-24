import { Pending } from "@/app/services/pendingService";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    const data = await prisma.issuedItemsPending.findMany()
    return NextResponse.json(data)
}

export async function POST(request : NextRequest){
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