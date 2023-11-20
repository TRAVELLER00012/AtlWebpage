import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function GET(request:NextRequest){
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== process.env.DB_EMAIL)
        return NextResponse.json({error:"Unauthorized"},{status:401})

    return NextResponse.json(await prisma.user.findMany())
}