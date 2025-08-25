import { NextResponse } from "next/server";

import { getBuildingManager } from "@/actions/get-building-manager";

export async function GET() {
  try {
    const { users } = await getBuildingManager();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in building manager API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch building manager" },
      { status: 500 },
    );
  }
}
