export const TOURNAMENT_STATE = {
  all: "all",
  pending: "pending",
  inProgress: "in_progress",
  ended: "ended",
} as const;

export type TournamentState =
  typeof TOURNAMENT_STATE[keyof typeof TOURNAMENT_STATE];

export const TOURNAMENT_TYPE = {
  singleEl: "single elimination",
  doubleEl: "double elimination",
  roundRobin: "round robin",
  swiss: "swiss",
} as const;

export type TournamentType =
  typeof TOURNAMENT_TYPE[keyof typeof TOURNAMENT_TYPE];

export const RANKED_BY = {
  matchWin: "match wins",
  gameWins: "game wins",
  pointsScored: "points scored",
  pointsDifference: "points difference",
  custom: "custom",
} as const;

export type RankedBy = typeof RANKED_BY[keyof typeof RANKED_BY];
