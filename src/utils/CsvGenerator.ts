import { isNull } from "./Helper";

type Value = string | number | boolean | null;
/**
 * records の CSV を Blob に変換、URL を生成する。
 * key をヘッダーとして一番初めの列に追加する。
 * key の整合性は保証しておらず、指定した key が存在しない場合、空文字を生成する。
 * a タグの href に追加、click() を実行すれば、ブラウザでダウンロードが走る。
 *
 * @param {Record<string, Value>[]} records - CSVにする配列
 * @param {string | undefined} keys - CSV のカラム。渡さない場合、インデックス0のキーを参照する。
 * @return {string} - 生成した CSV の URL。
 */

export function generateCsvStr(records: Record<string, Value>[], keys?: string[]): string {
  if (records.length === 0) {
    return "";
  }
  const columns = keys ?? Object.keys(records[0]);
  const data = [
    ...[columns.join(",")],
    ...records.reduce<string[]>((previousValue, currentElement) => {
      const values: string[] = [];

      // CSV のカラムを合わせるために、 null | undefined は空文字を挿入、その他の型も変換する
      columns.forEach((e) => {
        // 参照がない場合に undefined を出力させるために、 key で指定する
        const value: Value | undefined = currentElement[e];

        if (isNull(value)) {
          values.push("");
        } else if (typeof value === "number") {
          values.push(value.toString());
        } else if (typeof value === "boolean") {
          values.push(value.toString());
        } else {
          values.push(value);
        }
      });

      return [...previousValue, values.join(",")];
    }, []),
  ].join("\r");

  return data;
}
