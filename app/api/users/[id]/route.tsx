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
    const result = await prisma.user.findFirst({
        where:{
            id:parseInt(params.id)
        },
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
    })
    return NextResponse.json(result)
}