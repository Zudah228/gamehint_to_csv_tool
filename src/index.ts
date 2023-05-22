import { createTournament } from "./application/CreateTournament";
import { AppError } from "./domain/exception/AppError";
import { getCommandLineArg } from "./utils/CommandLineArg";

async function run() {
  try {
    // csv の読み込み
    const csvFileName = getCommandLineArg("csvFileName");

    if (typeof csvFileName !== "string") {
      throw new AppError({ name: "unknown", message: "引数にファイル名が指定されていません" });
    }

    createTournament.call(csvFileName);
  } catch (e) {
    console.error(e);
  }
}

run();
