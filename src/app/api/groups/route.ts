import { appendRow } from "@/lib/sheets";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // 依 README 結構：Title | Destination | Date | Budget | Creator_Email | Created_At | Status
    const row = [
      data.title,
      data.destination,
      data.date,
      data.budget,
      data.creatorEmail,
      new Date().toISOString(),
      "recruiting",
    ];
    await appendRow("Groups", row);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
