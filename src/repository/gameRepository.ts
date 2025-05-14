import Game from "../models/Game";
import type { GameType } from "../models/Game";

export async function insertGames(games: GameType[]) {
  if (!games.length) return;
  console.log(games);
  //   await Game.insertMany(games);
}
