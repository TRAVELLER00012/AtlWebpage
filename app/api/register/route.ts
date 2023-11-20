import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
import bcrypt from "bcrypt"

const schema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    password : z.string(),
    age : z.number().min(3),
    number_of_years_in_atl : z.number(),
    phonenumber : z.number(),
    bus_number : z.string(),
    email : z.string().email(),
    class : z.number(),
    section : z.string(),
    user_type : z.string()
    
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400})
    const user = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    })

    if (user) return NextResponse.json({error:"User already exists"},{status:400})

    const hashedPassword = await bcrypt.hash(body.password, 1)
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