import path from "path";
import { writeFile } from "fs";

import { GameHintCsv } from "../domain/repositories/game_hint/GameHintCsv";
import { GamehintParticipant } from "../domain/entities/gamehint/Participant";
import {
  TournamentCreateParam,
  tournamentRepository,
} from "../domain/repositories/challonge/TournamentRepository";
import { getCommandLineArg } from "../utils/CommandLineArg";
import { participantRepository }
  from "../domain/repositories/challonge/ParticipantsRepository";
import { generateCsvStr } from "../utils/CsvGenerator";
import { AdminParticipant }
  from "../domain/entities/admin_csv_result/AdminParticipant";

class CreateTournament {
  private static instance: CreateTournament;
  static getInstance() {
    if (!CreateTournament.instance) {
      CreateTournament.instance = new CreateTournament();
    }
    return CreateTournament.instance;
  }
  async call() {
    // csv の読み込み
    const csvFileName = getCommandLineArg("csvFileName");

    if (csvFileName === undefined) {
      console.error("コマンドライン引数が無効です。");
      return;
    }
    const participantsCsv = new GameHintCsv<GamehintParticipant>(
        `${path.dirname("")}/_import/${csvFileName}.csv`
    );

    const participants = generateCsvStr(
        participantsCsv.indices.map<AdminParticipant>(
            (e) => {
              return ({
                twitter: e.Twitterアカウント,
                チェック: "",
                名前: e.名前,
                合計値段: 1500,
                弁当代: "500",
                枠: e.応募枠,
              });
            }));

    writeFile(
        `${path.dirname("")}/_export/result.csv`, participants, {}, ()=> {
          //
        });

    // Challonge のトーナメントの作成
    const createParam: TournamentCreateParam = {
      "tournament[tournament_type]": "double elimination",
      "tournament[name]": csvFileName,
    };

    console.log(
        `作成するトーナメントの名前：${createParam["tournament[name]"]}`
    );

    console.log("トーナメントを作成しています...");

    const createResult = await tournamentRepository.create(createParam);
    const createTournamentId = createResult.id.toString();

    console.log("トーナメントの作成に成功しました！");

    // Challonge のトーナメントに参加者の追加
    console.log("トーナメントに参加者を追加しています...");

    for await (const participant of participantsCsv.indices) {
      await participantRepository.create(createTournamentId, {
        "participant[name]": participant.名前,
      });
    }

    console.log("参加者の追加に成功しました！");
    console.log(`URL: ${createResult.url}`);
  }
}

export const createTournament = CreateTournament.getInstance();
