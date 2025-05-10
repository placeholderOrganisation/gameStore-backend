import Game from "../models/Game";
import { Router } from "express";

const router = Router();

// GET /api/games - Get all active games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find({ isActive: true });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error });
  }
});

export default router;
