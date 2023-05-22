import { writeFile } from "fs";
import path from "path";

import { AdminParticipant } from "../domain/entities/admin_csv_result/AdminParticipant";
import { GamehintParticipant } from "../domain/entities/gamehint/Participant";
import { participantRepository } from "../domain/repositories/challonge/ParticipantsRepository";
import { TournamentCreateParam, tournamentRepository } from "../domain/repositories/challonge/TournamentRepository";
import { GameHintCsv } from "../domain/repositories/game_hint/GameHintCsv";
import { generateCsvStr } from "../utils/CsvGenerator";

class CreateTournament {
  private static instance: CreateTournament;
  static getInstance = () => {
    if (!CreateTournament.instance) {
      CreateTournament.instance = new CreateTournament();
    }
    return CreateTournament.instance;
  };

  call = async (csvFileName: string) => {
    const participantsCsv = GameHintCsv.fromPath<GamehintParticipant>(`${path.dirname("")}/_import/${csvFileName}`);

    const participants = generateCsvStr(
      participantsCsv.indices.map<AdminParticipant>((e) => {
        return {
          twitter: e.Twitterアカウント,
          チェック: "",
          名前: e.名前,
          合計値段: 1500,
          弁当代: "500",
          枠: e.応募枠,
        };
      })
    );

    writeFile(`${path.dirname("")}/_export/result.csv`, participants, {}, () => {
      //
    });

    // Challonge のトーナメントの作成
    const createParam: TournamentCreateParam = {
      "tournament[tournament_type]": "double elimination",
      "tournament[name]": csvFileName,
    };

    console.info(`作成するトーナメントの名前：${createParam["tournament[name]"]}`);

    console.info("トーナメントを作成しています...");

    const createResult = await tournamentRepository.create(createParam);
    const createTournamentId = createResult.id.toString();

    console.info("トーナメントの作成に成功しました！");

    // Challonge のトーナメントに参加者の追加
    console.info("トーナメントに参加者を追加しています...");

    for await (const participant of participantsCsv.indices) {
      await participantRepository.create(createTournamentId, {
        "participant[name]": participant.名前,
      });
    }

    console.info("参加者の追加に成功しました！");
    console.info(`URL: ${createResult.url}`);
  };
}

export const createTournament = CreateTournament.getInstance();
