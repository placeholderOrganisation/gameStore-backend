import axios from "axios";

const GIANTBOMB_API_URL = `https://www.giantbomb.com/api/search/?api_key=${process.env.GIANTBOMB_API_KEY}&format=json&query=`;
const RAWG_API_URL = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=`;

export async function fetchGameInfoFromGiantBomb(gameName: string): Promise<any | null> {
  try {
    const response = await axios.get(GIANTBOMB_API_URL + gameName);

    const game = response.data.results?.[0];
    if (!game) return null;

    return game;
  } catch (err) {
    console.error(`Error fetching game "${gameName}":`, err);
    return null;
  }
}

export async function fetchGameInfoFromRAWG(gameName: string): Promise<any | null> {
  try {
    const response = await axios.get(RAWG_API_URL + gameName);

    const game = response.data.results?.[0];
    if (!game) return null;

    return game;
  } catch (err) {
    console.error(`Error fetching game "${gameName}":`, err);
    return null;
  }
}
