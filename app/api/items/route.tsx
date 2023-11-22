import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Item } from "@/app/services/itemListService";

export async function GET(request:NextRequest){
    return NextResponse.json(await prisma.items.findMany())
}
export async function POST(request: NextRequest){
    const body : Item = await request.json();
    await prisma.items.create({
        data: {
            name: body.name,
            issuable : body.issuable,
            quantity : body.quantity
        }
    })
    return NextResponse.json({
        id:body.id
    })
}