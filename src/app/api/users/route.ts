import { NextRequest, NextResponse } from "next/server";
import connectDb from "../../../lib/connectDb";
import userModel from "../../../model/userModel";

// Ensure the database is connected once
connectDb();

export async function GET(req: NextRequest) {
  const users = await userModel.find(); // Fetch all users from the database
  return NextResponse.json(
    {
      isSuccessful: true,
      users,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { firstname, lastname, email, password } = await req.json();
  const newUser = new userModel({ firstname, lastname, email, password });

  try {
    await newUser.save();
    return NextResponse.json(
      {
        isSuccessful: true,
        data: newUser, // Return the created user
      },
      { status: 201 } // Status code 201 for created resource
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      {
        isSuccessful: false,
        message: "Error saving user",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
