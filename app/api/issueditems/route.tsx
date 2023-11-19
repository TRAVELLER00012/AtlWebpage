import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";


export async function GET(request : NextRequest){
    return NextResponse.json(await prisma.issuedItems.findMany())
}