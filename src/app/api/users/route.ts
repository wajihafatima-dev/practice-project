import { NextRequest, NextResponse } from "next/server";
import connectDb from "../../../lib/connectDb";
import userModel from "../../../model/userModel";

export async function GET(req:NextRequest) {
  try {
    await connectDb(); 
    const users = await userModel.find();
    return NextResponse.json({ isSuccessful: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req:NextRequest) {
  try {
    await connectDb(); 
    const { firstname, lastname, email, password } = await req.json();
    const newUser = new userModel({ firstname, lastname, email, password });

    await newUser.save(); 
    return NextResponse.json(
      { isSuccessful: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Error saving user" },
      { status: 500 }
    );
  }
}
