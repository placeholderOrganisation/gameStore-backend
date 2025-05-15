import { parseSheetData, RawGameEntry } from "../utils/parseSheetData";
import {
  fetchGameInfoFromGiantBomb,
  fetchGameInfoFromRAWG,
} from "./gameInfoService";
import {
  getExistingGames,
  insertGames,
  updateGames,
} from "../repository/gameRepository";
import type { GameType } from "../models/Game";

export async function processAndStoreGames(
  rows: (string | number)[][]
): Promise<void> {
  const rawGames = parseSheetData(rows);
  const existingGames = await getExistingGames();
  const newGames = rawGames.filter(
    (game) =>
      !existingGames.some((g) => {
        return g.name === game.name && g.platform === game.platform;
      })
  );
  const existingStaleGames: RawGameEntry[] = rawGames
    .map((ug) => {
      const dbGame = existingGames.find(
        (g) => g.name === ug.name && g.platform === ug.platform
      );
      if (
        dbGame &&
        (ug.featured !== dbGame.featured || ug.price !== dbGame.price)
      ) {
        return ug;
      }
      return undefined;
    })
    .filter((g): g is RawGameEntry => Boolean(g));
  const names = [...new Set(newGames.map((g) => g.name))];
  const infoMap = new Map<string, any>();

  await Promise.all(
    names.map(async (name) => {
      const info = await fetchGameInfoFromGiantBomb(name);
      if (info) infoMap.set(name, info);
    })
  );

  await Promise.all(
    names.map(async (name) => {
      const info = await fetchGameInfoFromRAWG(name);
      const existingInfo = infoMap.get(name);
      if (info) {
        if (!existingInfo) {
          infoMap.set(name, info);
        } else {
          // Merge the info from both APIs
          infoMap.set(name, {
            ...existingInfo,
            ...info,
          });
        }
      }
    })
  );

  const enrichedGames = newGames.map(
    (game): GameType => {
      const info = infoMap.get(game.name);
      return {
        name: game.name,
        formattedName: info?.name || game.name,
        platform: game.platform,
        rating: info?.rating || 0,
        price: game.price,
        imgs: info?.image || [],
        isActive: true,
        genre: info?.genres?.[0]?.name || "Unknown",
        featured: game.featured,
        description: info?.deck || "",
      };
    }
  );

  await insertGames(enrichedGames);
  await updateGames(existingStaleGames);
}
