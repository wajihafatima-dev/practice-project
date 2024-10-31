import { NextRequest, NextResponse } from "next/server";

export function GET(req:NextRequest){
let q =req.nextUrl.searchParams
let abc=q.get('users');
return NextResponse.json([q],
{status:200}
)
}