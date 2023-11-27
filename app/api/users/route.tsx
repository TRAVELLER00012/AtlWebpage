import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request:NextRequest){
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
}