import express from "express";
import { readFromSheet, writeToSheet } from "../services/google-sheets";
import { processAndStoreGames } from "../services/gameProcessor";

const router = express.Router();

router.get("/read", async (req, res) => {
  try {
    const range = req.query.range as string | undefined;
    const sheet = req.query.sheet as string | undefined;

    const data = await readFromSheet(range, sheet);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to read from sheet" });
  }
});

router.post("/write", async (req, res) => {
  try {
    const { range, values } = req.body;
    if (!range || !Array.isArray(values)) {
      return res.status(400).json({ success: false, error: "Invalid input" });
    }

    const updatedRange = await writeToSheet(range, values);
    res.json({ success: true, updatedRange });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to write to sheet" });
  }
});

router.post("/ingest-games", async (req, res) => {
  try {
    const range = req.query.range as string | undefined;
    const sheet = req.query.sheet as string | undefined;

    const rows = await readFromSheet(range, sheet);
    await processAndStoreGames(rows);

    res.json({ success: true, message: "Games processed and stored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to ingest games" });
  }
});

export default router;
