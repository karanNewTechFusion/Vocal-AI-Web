import express from "express";
import {
  
  analyzeTempAudio,         deleteAudio,         downloadAudio,         finalizeAndSaveAudio,         getUserAudios,         // 👈 New controller
  uploadAudioMiddleware,
} from "../controllers/audioController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔄 Step 1: Temporary analysis (used before saving)
router.post("/analyze-temp", uploadAudioMiddleware, analyzeTempAudio);

// 💾 Step 2: Save only after user agrees
router.post("/save",verifyAuth ,uploadAudioMiddleware, finalizeAndSaveAudio);

router.get("/user/:userId", verifyAuth, getUserAudios);

// ❌ Delete recording
router.delete("/:id", verifyAuth, deleteAudio);

// ⬇️ Download audio
router.get("/download/:id", verifyAuth, downloadAudio);

export default router;
