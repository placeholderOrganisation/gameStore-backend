import Game from "../models/Game";
import type { GameType } from "../models/Game";

export async function insertGames(games: GameType[]) {
  if (!games.length) return;
  try {
    await Game.insertMany(games, { ordered: false });
  } catch (err: any) {
    if (err.code === 11000 || err.writeErrors) {
      // Duplicate key error(s), log and continue
      console.warn("Some games were duplicates and were skipped.");
    } else {
      throw err;
    }
  }
}
