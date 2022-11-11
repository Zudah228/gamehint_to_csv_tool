import { AbstractChallongeRepository } from "./AbstractChallongeRepository";
import { Tournament } from "../../entities/challonge/tournament/Tournament";
import {
  TournamentState,
  TournamentType,
} from "../../entities/challonge/tournament/types";

class TournamentRepository extends AbstractChallongeRepository {
  private static instance: TournamentRepository;
  static getInstance() {
    if (!TournamentRepository.instance) {
      TournamentRepository.instance = new TournamentRepository();
    }
    return TournamentRepository.instance;
  }

  async retrieve(
      tournamentId: string,
      parameters?: TournamentRetrieveParam
  ): Promise<Tournament> {
    const result = await this.fetch<Tournament>(
        `tournaments/${tournamentId}`,
        parameters,
        {
          method: "GET",
        }
    );
    return Tournament.fromJson(result);
  }

  async list(parameters?: TournamentListParam): Promise<Tournament[]> {
    const result = await this.fetch<unknown[]>("tournaments", parameters, {
      method: "GET",
    });
    return result.map((e) => Tournament.fromJson(e));
  }

  async create(parameters?: TournamentCreateParam): Promise<Tournament> {
    const result = await this.fetch<unknown>("tournaments", parameters, {
      method: "POST",
    });

    return Tournament.fromJson(result);
  }

  async delete(tournamentId: string): Promise<Tournament> {
    const result = await this.fetch<unknown>(
        `tournaments/${tournamentId}`,
        undefined,
        {
          method: "DELETE",
        }
    );

    return Tournament.fromJson(result);
  }
}

export const tournamentRepository = TournamentRepository.getInstance();

export type TournamentListParam = {
  state?: TournamentState;
  type?: TournamentType;
  created_after?: string;
  created_before?: string;
  subdomain?: string;
};

export type TournamentRetrieveParam = {
  include_participants: "0" | "1";
  include_matches: "0" | "1";
};

export type TournamentCreateParam = {
  "tournament[name]": string;
  "tournament[tournament_type]": TournamentType;
};
