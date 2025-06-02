import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

export async function GET(req: NextRequest) {
  try {
    if (!privateKey || !clientEmail || !spreadsheetId) {
      throw new Error("Google Sheets env not set");
    }
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Groups!A1:Z1000",
    });
    const rows = result.data.values || [];
    const [header, ...data] = rows;
    const groups = data.map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, idx) => {
        obj[key] = row[idx] || "";
      });
      return obj;
    });
    return NextResponse.json({ ok: true, groups });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
