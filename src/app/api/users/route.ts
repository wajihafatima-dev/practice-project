// /app/api/users/route.js

import { NextRequest, NextResponse } from "next/server";
import connectDb from '../../../lib/connectDb'; // Adjust path if necessary
import userModel from '../../../model/userModel'; 
export async function GET(req: NextRequest) {
  await connectDb(); // Ensure the database is connected
  const users = await userModel.find(); // Fetch all users from the database

  return NextResponse.json(
    {
      isSuccessful: true,
      users
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  await connectDb(); // Ensure the database is connected
  const { firstname, lastname, email, password } = await req.json();
  const newUser = new userModel({ firstname, lastname, email, password });

  try {
    await newUser.save(); 
    return NextResponse.json(
      {
        isSuccessful: true,
        data: newUser // Return the created user
      },
      { status: 201 } // Status code 201 for created resource
    );
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      {
        isSuccessful: false,
        message: 'Error saving user'
      },
      { status: 500 } // Internal Server Error
    );
  }
}
