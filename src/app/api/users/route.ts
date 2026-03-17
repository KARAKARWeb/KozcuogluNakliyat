import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData } from "@/lib/db";
import { sanitizeUser, searchUsers, filterUsersByRole, filterActiveUsers } from "@/lib/auth-utils";
import { successResponse, errorResponse } from "@/lib/api-utils";
import type { User } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized", 401);
    }

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("search") || "";
    const role = searchParams.get("role") as "ADMIN" | "EDITOR" | "VIEWER" | null;
    const activeOnly = searchParams.get("active") === "true";

    let users = await readData<User[]>("users.json");

    // Apply filters
    if (query) {
      users = searchUsers(users, query);
    }

    if (role) {
      users = filterUsersByRole(users, role);
    }

    if (activeOnly) {
      users = filterActiveUsers(users);
    }

    // Sanitize users (remove passwords)
    const sanitizedUsers = users.map(sanitizeUser);

    return successResponse(sanitizedUsers);
  } catch (error) {
    console.error("Get users error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return errorResponse("Forbidden", 403);
    }

    const body = await req.json();
    const { name, email, password, role = "VIEWER" } = body;

    const users = await readData<User[]>("users.json");
    
    // Check if user exists
    if (users.find((u) => u.email === email)) {
      return errorResponse("User already exists", 409);
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // Should be hashed
      role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeData("users.json", users);

    return successResponse(sanitizeUser(newUser), undefined, "User created");
  } catch (error) {
    console.error("Create user error:", error);
    return errorResponse("Internal server error", 500);
  }
}
