import { NextRequest, NextResponse } from "next/server";

export default function middleware(request : NextRequest){
    return NextResponse.json({error:"Not Authenticated"},{status:400})
}
export const config = {
    matcher : ['/api/users']
}