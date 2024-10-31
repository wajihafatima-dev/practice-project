import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory storage for users
let usersData: Array<{ firstname: string, lastname: string, email: string, password: string }> = [];

export function GET(req: NextRequest) {
  return NextResponse.json(
    {
      isSuccessful: true,
      users: usersData // Respond with all stored users
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  // Parse JSON data from the request body
  const { firstname, lastname, email, password } = await req.json();

  // Add the new user to the in-memory usersData array
  usersData.push({ firstname, lastname, email, password });

  return NextResponse.json(
    {
      isSuccessful: true,
      data: { firstname, lastname, email, password }
    },
    { status: 201 } // Status code 201 for created resource
  );
}
