import * as fs from "fs";

/**
 *
 */
export class GameHintCsv<T extends Record<string, unknown> = Record<string, unknown>> {
  constructor(protected file: Buffer, private decode = (obj: Record<string, unknown>) => obj as T) {
    this.indices = this.#generateEntities();
  }
  indices: T[];

  static fromPath = <T extends Record<string, unknown> = Record<string, unknown>>(path: string): GameHintCsv<T> => {
    try {
      const file = fs.readFileSync(path.endsWith(".csv") ? path : path + ".csv");
      return new GameHintCsv<T>(file);
    } catch (e) {
      console.error("ファイルの読み取りに失敗しました");
      throw e;
    }
  };

  #generateEntities = (): T[] => {
    const keys = this.#splitSpecificRow(this.#splitRows(), 0);
    const rows = this.#splitRows().slice();
    rows.splice(0, 1);

    const list: T[] = [];

    for (let i = 0; i < rows.length; i++) {
      const values = this.#splitSpecificRow(rows, i);
      let obj: Record<string, unknown> = {};
      keys.forEach((key, index) => {
        obj = {
          ...obj,
          [key]: values[index],
        };
      });
      list.push(this.decode(obj));
    }

    return list;
  };

  #splitSpecificRow = (target: string[], targetIndex: number): string[] => {
    return (
      target[targetIndex]
        // HACK: GameHint の CSV にしかr使えない、限定的な分け方。
        // NOTE: 金額に , が入っているせいで、単純な split(",") では分けられない。
        // eslint-disable-next-line prettier/prettier
        .split(",\"")
        .map((e) => {
          // eslint-disable-next-line prettier/prettier
          return e.replaceAll("\"", "");
        })
    );
  };

  #splitRows = (): string[] => {
    return this.file.toString().split("\n");
  };
}
