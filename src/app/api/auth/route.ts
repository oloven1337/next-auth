import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "3d" });
    return NextResponse.json({ token });
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
