import { NextResponse } from "next/server";

import { getAdmins } from "@/actions/get-admins";

export async function GET() {
  try {
    const { users } = await getAdmins();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in admins API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 },
    );
  }
}
