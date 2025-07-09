import express from "express";
import {
  analyzeTempAudio,
  deleteAudio,
  downloadAudio,
  finalizeAndSaveAudio,
  getAudioSummary,
  getMonthlyProgress,
  getPitchTrend,
  getUserAchievements,
  getUserAudios, 
  uploadAudioMiddleware,
} from "../controllers/audioController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/analyze-temp", uploadAudioMiddleware, analyzeTempAudio);

router.post("/save", verifyAuth, uploadAudioMiddleware, finalizeAndSaveAudio);

router.get("/user/:userId", verifyAuth, getUserAudios);

router.delete("/:id", verifyAuth, deleteAudio);

router.get("/download/:id", verifyAuth, downloadAudio);

router.get("/summary", verifyAuth, getAudioSummary);

router.get("/monthly", verifyAuth, getMonthlyProgress);

router.get("/pitch-trend", verifyAuth, getPitchTrend);

router.get("/achievements", verifyAuth, getUserAchievements);

export default router;
