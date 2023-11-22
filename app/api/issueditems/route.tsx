import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { Item } from "@/app/services/issuedItemService";


export async function GET(request : NextRequest){
    return NextResponse.json(await prisma.issuedItems.findMany())
}

export async function POST(request:NextRequest){
    let body : Item = await request.json();
    prisma.issuedItems.create({
        data:body
    })
    return NextResponse.json({id:body.id})
}