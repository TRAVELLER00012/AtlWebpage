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
    const result = prisma.user.findMany({
        where:{
            id:parseInt(params.id)
        }
    })
}