import { NextRequest, NextResponse } from "next/server";

import { getUsers } from "@/actions/get-users";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const buildingId = searchParams.get("buildingId") || undefined;

    const { users } = await getUsers({ search, buildingId });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in users API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
