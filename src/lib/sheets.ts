import { google } from "googleapis";

const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

if (!privateKey || !clientEmail || !spreadsheetId) {
  throw new Error("Google Sheets env not set");
}

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendRow(sheetName: string, values: unknown[]) {
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1:Z1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}
