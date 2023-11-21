import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

interface Props{
    params : {
        id:string
    }
}

export async function GET(request:NextRequest, {params} : Props){
    const session = await getServerSession(authOptions);
  
    if (!session || session.user?.email !== process.env.DB_EMAIL)
    return NextResponse.json(await prisma.user.findFirst({
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
        },
        where:{
            id: parseInt(params.id)
        }
    }))

    return NextResponse.json(await prisma.user.findFirst({
        where:{
            id: parseInt(params.id)
        }
    }))
}