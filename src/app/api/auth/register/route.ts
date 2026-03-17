import { NextRequest, NextResponse } from "next/server";
import { registerSchema, hashPassword, sanitizeUser } from "@/lib/auth-utils";
import { readData, writeData } from "@/lib/db";
import type { User } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.format(),
        },
        { status: 422 }
      );
    }

    const { name, email, password, role = "VIEWER" } = validation.data;

    // Check if user already exists
    const users = await readData<User[]>("users.json");
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User already exists",
          message: "Bu e-posta adresi zaten kayıtlı",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeData("users.json", users);

    // Return sanitized user
    return NextResponse.json(
      {
        success: true,
        data: sanitizeUser(newUser),
        message: "Kullanıcı başarıyla oluşturuldu",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Kayıt işlemi başarısız oldu",
      },
      { status: 500 }
    );
  }
}
