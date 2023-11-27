import { Notification } from "@/app/services/notificationService";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";

export async function GET(request : NextRequest){
    const data = await prisma.notification.findMany();
    return NextResponse.json(data)
}

export async function POST(request : NextRequest){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({err : "Unauthroized"},{status:401})
    const body : Notification = await request.json();   
    const data = await prisma.notification.create({
        data : {
            access : body.access,
            description : body.description,
            notificationType : body.notificationType,
            issuedItemId : body.issuedItemId
        }
    })
    return NextResponse.json({id:data.id})
}   
