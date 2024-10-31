import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  let q = req.nextUrl.searchParams;
  let users = q.getAll('users'); 
  
  return NextResponse.json(
    {
      isSuccessful: true,
      users: users
    },
    { status: 200 }
  );
}
