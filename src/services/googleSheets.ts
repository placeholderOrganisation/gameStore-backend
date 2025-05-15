import { google, sheets_v4 } from "googleapis";
import { GoogleAuth, JWT } from "google-auth-library";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const spreadsheetId = process.env.GOOGLE_SHEETS_ID as string;
const keyFile = path.join(__dirname, "../../service-account.json");

let sheetsClient: sheets_v4.Sheets | null = null;

async function getSheetsClient(): Promise<sheets_v4.Sheets> {
  if (sheetsClient) return sheetsClient;

  const auth = new GoogleAuth({
    keyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = (await auth.getClient()) as JWT;
  sheetsClient = google.sheets({ version: "v4", auth: client });
  return sheetsClient;
}

export async function writeToSheet(
  range: string,
  values: (string | number)[][]
): Promise<string> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });

  return response.data.updatedRange || "unknown";
}

export async function readFromSheet(
  range?: string,
  sheet?: string
): Promise<(string | number)[][]> {
  const sheets = await getSheetsClient();

  let finalRange: string;

  if (range) {
    finalRange = range;
  } else {
    if (sheet) {
      finalRange = sheet; // Get all data in that sheet
    } else {
      // fallback to first sheet in the spreadsheet
      const metadata = await sheets.spreadsheets.get({ spreadsheetId });
      const firstSheet = metadata.data.sheets?.[0]?.properties?.title;
      if (!firstSheet) {
        throw new Error("No sheets found in spreadsheet.");
      }
      finalRange = firstSheet;
    }
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: finalRange,
  });

  return response.data.values || [];
}