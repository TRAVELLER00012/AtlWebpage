import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function GET(request:NextRequest){
    const session = await getServerSession(authOptions);
  
    if (!session || session.user?.email !== process.env.DB_EMAIL)
    return NextResponse.json(await prisma.user.findMany({
        select:{
            id:true,
            firstName:true,
            lastName:true,
            age:true,
            bus_number:true,
            class:true,
            email:true,
            number_of_years_in_atl:true,
            phonenumber:true,
            user_type:true,
            section:true
        }
    }))

    return NextResponse.json(await prisma.user.findMany())
}