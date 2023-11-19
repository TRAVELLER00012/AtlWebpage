import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";


async function GET(request : NextRequest){
    return NextResponse.json(await prisma.issuedItems.findMany())
}