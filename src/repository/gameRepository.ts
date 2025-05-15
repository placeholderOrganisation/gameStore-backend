import Game from "../models/Game";
import type { GameType } from "../models/Game";
import { RawGameEntry } from "../utils/parseSheetData";

export async function insertGames(games: GameType[]) {
  if (!games.length) return;
  try {
    await Game.insertMany(games, { ordered: false });
  } catch (err) {
    if (
      typeof err === "object" &&
      err &&
      ("code" in err || "writeErrors" in err)
    ) {
      // Duplicate key error(s), log and continue
      console.warn("Some games were duplicates and were skipped.");
    } else {
      throw err;
    }
  }
}

export async function updateGames(games: RawGameEntry[]) {
  if (!games.length) return;

  // Use bulkWrite for efficient multiple updates
  const bulkOps = games.map((game) => ({
    updateOne: {
      filter: { name: game.name, platform: game.platform },
      update: {
        $set: {
          featured: game.featured,
          price: game.price,
        },
      },
    },
  }));

  return await Game.bulkWrite(bulkOps);
}

export async function getExistingGames() {
  return await Game.find({});
}
