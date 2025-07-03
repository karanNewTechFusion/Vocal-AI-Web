import express from "express";
import {
  
  analyzeTempAudio,         finalizeAndSaveAudio,         // 👈 New controller
  uploadAudioMiddleware,
} from "../controllers/audioController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔄 Step 1: Temporary analysis (used before saving)
router.post("/analyze-temp", uploadAudioMiddleware, analyzeTempAudio);

// 💾 Step 2: Save only after user agrees
router.post("/save",verifyAuth ,uploadAudioMiddleware, finalizeAndSaveAudio);

export default router;
