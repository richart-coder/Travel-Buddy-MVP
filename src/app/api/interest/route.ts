import { appendRow } from "@/lib/sheets";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // 依 README 結構：Group_Title | User_Email | User_Name | Contact_Info | Submitted_At
    const row = [
      data.groupTitle,
      data.email,
      data.name,
      data.contactInfo || "",
      new Date().toISOString(),
    ];
    await appendRow("Interests", row);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
