import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";


export async function GET(request : NextRequest){
    const respone = await prisma.attendence.findMany();
    return NextResponse.json(respone)
}