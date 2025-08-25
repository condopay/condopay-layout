import { NextResponse } from "next/server";

import { getCounselors } from "@/actions/get-counselors";

export async function GET() {
  try {
    const { users } = await getCounselors();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in counselors API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch counselors" },
      { status: 500 },
    );
  }
}
