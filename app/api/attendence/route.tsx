import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { AttendenceProps } from "@/app/services/attendenceService";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function GET(request : NextRequest){
    const response = await prisma.attendence.findMany();
    return NextResponse.json(response)
}

export async function POST(request:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    let body : AttendenceProps= await request.json();
    const data = await prisma.attendence.create({
        data:{
            userId : body.userId,
            day : body.day,
            month : body.month,
            year : body.year,
            state : body.state
        }
    })
    return NextResponse.json({msg : "Succesful"})
}