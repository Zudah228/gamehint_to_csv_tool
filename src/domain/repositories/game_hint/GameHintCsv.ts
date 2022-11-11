import { readFileSync } from "fs";

export class GameHintCsv<T extends Record<string, unknown> = Record<string, unknown>> {
  constructor(
      path: string,
      decode = (obj: Record<string, unknown>) => obj as T) {
    this.file = readFileSync(path);
    this.#decode = decode;
    this.indices = this.#generateEntities();
  }
  indices: T[];

  protected file: Buffer;
  #decode: (obj: Record<string, unknown>) => T;

  #generateEntities(): T[] {
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
      list.push(this.#decode(obj));
    }

    return list;
  }

  #splitSpecificRow(target: string[], targetIndex: number): string[] {
    return target[targetIndex]
        // HACK: GameHint の CSV にしかr使えない、限定的な分け方。
        // NOTE: 金額に , が入っているせいで、単純な split(",") では分けられない。
        .split(",\"")
        .map((e) => {
          return e.replaceAll("\"", "");
        });
  }


  #splitRows(): string[] {
    return this.file
        .toString()
        .split("\n");
  }
}
