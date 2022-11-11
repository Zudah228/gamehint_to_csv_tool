export type GamehintParticipant = {
    "No.": string,
    "名前": string,
    ID: string,
    "Twitterアカウント": string,
    "Twitterリンク": string,
    // TODO: 枠の名前の enum
    "応募枠": "初参加枠",
    "金額": string,
    "出席確認": string,
    "支払確認": string,
    // TODO: 日時に変換
    "申し込み日時": string,
    // TODO: ステータスの enum
    "ステータス": string
  }
