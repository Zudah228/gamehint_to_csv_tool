/* eslint-disable camelcase */
import { GoogleAuth } from "google-auth-library";
import { google, sheets_v4 } from "googleapis";

class GoogleSpreadSheetRepository {
  private static instance: GoogleSpreadSheetRepository;
  constructor(sheets: sheets_v4.Sheets) {
    this.sheets = sheets;
  }
  static getInstance = () => {
    if (!GoogleSpreadSheetRepository.instance) {
      const auth = new GoogleAuth({
        scopes: "https://www.googleapis.com/auth/spreadsheet",
      });
      GoogleSpreadSheetRepository.instance = new GoogleSpreadSheetRepository(google.sheets({ version: "v4", auth }));
    }
    return GoogleSpreadSheetRepository.instance;
  };

  sheets: sheets_v4.Sheets;

  create = async (title: string): Promise<sheets_v4.Schema$Spreadsheet> => {
    const result = await this.sheets.spreadsheets.create({
      requestBody: {
        properties: { title },
      },
    });
    return result.data;
  };
  get = async (spreadsheetId: string): Promise<sheets_v4.Schema$ValueRange> => {
    const result = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      // range: 'A1'
    });

    return result.data;
  };

  // Todo: 更新処理の追加
  // async update(title: string): Promise<SpreadSheetResult | undefined> {
  //   const result = await this.sheets.spreadsheets.batchUpdate({
  //     requestBody: {
  //       properties: { title },
  //     },
  //   }, {});

  //   return {
  //     sheetId: result.data.spreadsheetId,
  //     url: result.data.spreadsheetUrl,
  //   };
  // }

  qrCodeCell = (url: string): string => {
    return `=image("http://chart.apis.google.com/chart?chs=250x250&cht=qr&chl=${url}")`;
  };
}

export const googleSpreadSheetRepository = GoogleSpreadSheetRepository.getInstance();
