// import { NextRequest, NextResponse } from "next/server";
// import connectDb from "../../../lib/connectDb";
import User from "../../../model/userModel";


// export async function GET(req: NextRequest) {
//   try {
//       await connectDb(); 
//       const users = await userModel.find();
//       return NextResponse.json({ isSuccessful: true, users }, { status: 200 });
//   } catch (error: any) {
//       console.error("Error fetching users:", error.message);
//       return NextResponse.json(
//           { isSuccessful: false, message: "Error fetching users" },
//           { status: 500 }
//       );
//   }
// }

// export async function POST(req:NextRequest) {
//   try {
//     await connectDb(); 
//     const { firstname, lastname, email, password }: { firstname: string; lastname: string; email: string; password: string; } = await req.json();
//     if (!firstname || !lastname || !email || !password) {
//       return NextResponse.json(
//         { isSuccessful: false, message: "All fields are required" },
//         { status: 400 }
//       );
//     }
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { isSuccessful: false, message: "Email already exists" },
//         { status: 400 }
//       );
//     }
//     const newUser = new userModel({ firstname, lastname, email, password });
//     await newUser.save();
//     return NextResponse.json(
//       { isSuccessful: true, data: newUser },
//       { status: 201 }
//     );
//   } catch (error:any) {
//     console.error("Error saving user:", error);
//     console.error(error.stack); 
//     return NextResponse.json(
//       { isSuccessful: false, message: "Error saving user" },
//       { status: 500 }
//     );
//   }
// }
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectDb"; // Use alias if you have it
import bcrypt from "bcryptjs";

// GET: Fetch all users
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST: Register a new user
export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { isSuccessful: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { isSuccessful: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const { password: _, ...userData } = newUser.toObject();

    return NextResponse.json(userData);
  } catch (error: any) {
    console.error("Error saving user:", error.message);
    return NextResponse.json(
      { isSuccessful: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

