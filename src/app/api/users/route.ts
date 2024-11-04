import { NextRequest, NextResponse } from "next/server";
import {connectDb} from "../../../lib/connectDb";
import userModel from "../../../model/userModel";

export async function GET(req:NextRequest) {
  try {
    await connectDb(); // Ensure the database connection is established
    const users = userModel.find({});
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
    await connectDb(); // Ensure the database connection is established
    const { firstname, lastname, email, password } = await req.json();

    // Basic validation check
    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json(
        { isSuccessful: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { isSuccessful: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Create a new user instance
    const newUser = new userModel({ firstname, lastname, email, password });

    // Save the new user to the database
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
