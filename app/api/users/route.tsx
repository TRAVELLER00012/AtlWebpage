import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

export async function GET(request:NextRequest){
    const response = await prisma.user.findMany({
        select:{
            age : true,
            id: true,
            firstName: true,
            lastName : true,
            bus_number : true,
            number_of_years_in_atl : true,
            phonenumber : true,
            class : true,
            email : true,
            section : true,
            user_type : true
        }
    });
    return NextResponse.json(response)
}




export async function POST(request: NextRequest){
    const body = await request.json();
    const user = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    })

    if (user) return NextResponse.json({error:"User already exists"},{status:400})

    const hashedPassword = await bcrypt.hash(body.password, 10)
    const newUser = await prisma.user.create({
        data:{
            age: body.age,
            bus_number: body.bus_number,
            class: body.class,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            number_of_years_in_atl: body.number_of_years_in_atl,
            password: hashedPassword,
            phonenumber: body.phonenumber,
            section: body.section,
            user_type: body.user_type
        }
    })
    return NextResponse.json({email: newUser.email})
}