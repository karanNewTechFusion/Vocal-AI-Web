import express from "express";
import {
  analyzeTempAudio,
  deleteAudio,
  downloadAudio,
  finalizeAndSaveAudio,
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

export default router;
