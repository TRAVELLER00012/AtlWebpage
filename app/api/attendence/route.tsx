import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { AttendenceProps } from "@/app/services/attendenceService";


export async function GET(request : NextRequest){
    const respone = await prisma.attendence.findMany();
    return NextResponse.json(respone)
}

export async function POST(request:NextRequest) {
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