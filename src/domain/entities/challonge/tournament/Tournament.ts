import { isObject } from "../../../../utils/Helper";
import { TournamentState, RankedBy, TournamentType } from "./types";

export class Tournament {
  accept_attachments!: boolean;
  allow_participant_match_reporting!: boolean;
  anonymous_voting!: boolean;
  category!: null;
  check_in_duration!: null;
  completed_at!: Date;
  created_at!: Date;
  created_by_api!: boolean;
  credit_capped!: boolean;
  description!: string;
  game_id!: number;
  group_stages_enabled!: boolean;
  hide_forum!: boolean;
  hide_seeds!: boolean;
  hold_third_place_match!: boolean;
  id!: number;
  max_predictions_per_user!: number;
  name!: string;
  notify_users_when_matches_open!: boolean;
  notify_users_when_the_tournament_ends!: boolean;
  open_signup!: boolean;
  participants_count!: number;
  prediction_method!: number;
  predictions_opened_at!: null;
  private!: boolean;
  progress_meter!: number;
  pts_for_bye!: string;
  pts_for_game_tie!: string;
  pts_for_game_win!: string;
  pts_for_match_tie!: string;
  pts_for_match_win!: string;
  quick_advance!: boolean;
  ranked_by!: RankedBy;
  require_score_agreement!: boolean;
  rr_pts_for_game_tie!: string;
  rr_pts_for_game_win!: string;
  rr_pts_for_match_tie!: string;
  rr_pts_for_match_win!: string;
  sequential_pairings!: boolean;
  show_rounds!: boolean;
  signup_cap!: null;
  start_at!: null;
  started_at!: null;
  started_checking_in_at!: null;
  state!: TournamentState;
  swiss_rounds!: number;
  // TODO: 中身をはっきりさせる
  teams!: Array<string>;
  tournament_type!: TournamentType;
  updated_at!: Date;
  url!: string;
  description_source!: string;
  subdomain!: null;
  full_challonge_url!: string;
  live_image_url!: string;
  review_before_finalizing!: boolean;
  accepting_predictions!: boolean;
  participants_locked!: boolean;
  game_name!: boolean;
  participants_swappable!: boolean;
  team_convertable!: boolean;
  group_stages_were_started!: boolean;

  static fromJson(data: unknown): Tournament {
    if (!isObject(data) || !("tournament" in data)) {
      throw new Error("Tournament.fromJson");
    }

    // response.data.tournament に、各プロパティがある
    // Todo: 型チェック
    return data.tournament as Tournament;
  }
}
