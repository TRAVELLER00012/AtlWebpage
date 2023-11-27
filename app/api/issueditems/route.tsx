import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { Item } from "@/app/services/issuedItemService";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";


export async function GET(request : NextRequest){
    return NextResponse.json(await prisma.issuedItems.findMany())
}

export async function POST(request:NextRequest){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    let body : Item = await request.json();
    const item = await prisma.issuedItems.create({
        data:{
            dateOfIssue: body.dateOfIssue,
            dateOfReturn : body.dateOfReturn,
            itemId : body.itemId,
            itemName : body.itemName,
            quantity : body.quantity,
            userId : body.userId
        }
    })
    return NextResponse.json({id:item.id})
}