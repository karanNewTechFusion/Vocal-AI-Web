import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { Readable } from "stream";
import { decode } from "wav-decoder";
import { AMDF } from "pitchfinder";
import { std } from "mathjs";
import { sendResponse } from "../utility/responseHelper.js";
import dotenv from "dotenv";
import Audio from "../models/Audio.js";
import { uploadFileToStorage } from "../utility/storageHelper.js";
import { generateSingingFeedback } from "../utility/aiFeedbackHelper.js";
import { generateFeedbackTTS } from "../utility/generateTTS.js"; // adjust path if needed
import axios from "axios";
dotenv.config();

// Setup
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadAudioMiddleware = upload.single("audio");

// Convert WebM to MP3
function convertToMp3(buffer) {
  return new Promise((resolve, reject) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const chunks = [];
    ffmpeg(stream)
      .inputFormat("webm")
      .audioCodec("libmp3lame")
      .format("mp3")
      .on("error", reject)
      .pipe()
      .on("data", (chunk) => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)));
  });
}

// Convert MP3 to WAV
function convertToWav(buffer) {
  return new Promise((resolve, reject) => {
    const tmpInput = `input-${uuidv4()}.mp3`;
    const tmpOutput = `output-${uuidv4()}.wav`;
    fs.writeFileSync(tmpInput, buffer);

    ffmpeg(tmpInput)
      .toFormat("wav")
      .on("end", () => {
        const wavBuffer = fs.readFileSync(tmpOutput);
        fs.unlinkSync(tmpInput);
        fs.unlinkSync(tmpOutput);
        resolve(wavBuffer);
      })
      .on("error", reject)
      .save(tmpOutput);
  });
}

// Extract RMS volume
function extractRMS(buffer) {
  return new Promise((resolve, reject) => {
    const tmpFile = `tmp-${uuidv4()}.mp3`;
    fs.writeFileSync(tmpFile, buffer);

    ffmpeg(tmpFile)
      .audioFilters("volumedetect")
      .format("null")
      .on("stderr", (line) => {
        const match = line.match(/mean_volume: ([-\d.]+) dB/);
        if (match) {
          resolve(parseFloat(match[1]));
        }
      })
      .on("end", () => fs.unlinkSync(tmpFile))
      .on("error", reject)
      .save(process.platform === "win32" ? "NUL" : "/dev/null");
  });
}

// Decode pitch
function decodePitch(wavBuffer) {
  return decode(wavBuffer).then((audioData) => {
    const channelData = audioData.channelData[0];
    const detectPitch = AMDF();
    const pitches = [];

    for (let i = 0; i < channelData.length; i += 1024) {
      const slice = channelData.slice(i, i + 1024);
      const pitch = detectPitch(slice);
      if (pitch) pitches.push(pitch);
    }

    return pitches;
  });
}

// 🚀 Main controller
export const finalizeAndSaveAudio = async (req, res) => {
  try {
    const { file } = req;
    const { title, user_id } = req.body;

    if (!file || !title || !user_id) {
      return sendResponse(res, false, 400, "Missing required fields");
    }

    const mp3Buffer = await convertToMp3(file.buffer);
    const fileName = `${uuidv4()}.mp3`;
    const fileUrl = await uploadFileToStorage(mp3Buffer, fileName);

    if (!fileUrl) {
      return sendResponse(res, false, 500, "Failed to upload audio file");
    }

    const wavBuffer = await convertToWav(mp3Buffer);
    const pitches = await decodePitch(wavBuffer);
    const stability = std(pitches);
    const projection = await extractRMS(mp3Buffer);

    const audioDoc = await Audio.create({
      title,
      url: fileUrl,
      user_id,
      pitchData: pitches.slice(0, 100),
      stability,
      projection,
    });

    return sendResponse(res, true, 200, "Audio uploaded & analyzed", audioDoc);
  } catch (err) {
    console.error("❌ Audio processing failed:", err);
    return sendResponse(res, false, 500, "Internal server error", {
      error: err.message,
    });
  }
};









// // 🔍 Temporary audio analysis API – No save, only analysis
// export const analyzeTempAudio = async (req, res) => {
//   try {
//     const { file } = req;

//     if (!file) {
//       return sendResponse(res, false, 400, "Audio file is required");
//     }

//     const mp3Buffer = await convertToMp3(file.buffer);
//     const wavBuffer = await convertToWav(mp3Buffer);
//     const pitches = await decodePitch(wavBuffer);
//     const stability = std(pitches);
//     const projection = await extractRMS(mp3Buffer);

//     // 🧠 Add OpenAI feedback here (stubbed for now)
//     const aiFeedback = `Your pitch is ${Math.round(stability)} stable. Try articulating clearer.`

//     return sendResponse(res, true, 200, "Temporary analysis completed", {
//       pitchData: pitches.slice(0, 100),
//       stability,
//       projection,
//       aiFeedback,
//       previewAudio: mp3Buffer.toString('base64'), // Optional: send preview for client-side audio playback
//     });
//   } catch (err) {
//     console.error("❌ Temp audio analysis failed:", err);
//     return sendResponse(res, false, 500, "Internal error", { error: err.message });
//   }
// };




export const analyzeTempAudio = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return sendResponse(res, false, 400, "Audio file is required");
    }

    const mp3Buffer = await convertToMp3(file.buffer);
    const wavBuffer = await convertToWav(mp3Buffer);
    const pitches = await decodePitch(wavBuffer);
    const stability = std(pitches);
    const projection = await extractRMS(mp3Buffer);

    // 🌟 Generate AI feedback
    const aiFeedback = await generateSingingFeedback(stability, projection);

    // 🗣️ Convert feedback to voice
    const ttsPath = await generateFeedbackTTS(aiFeedback, "feedback.mp3");

    let feedbackAudioBase64 = null;
    if (ttsPath && fs.existsSync(ttsPath)) {
      const voiceBuffer = fs.readFileSync(ttsPath);
      feedbackAudioBase64 = voiceBuffer.toString("base64");
    }

    return sendResponse(res, true, 200, "Temporary analysis completed", {
      pitchData: pitches.slice(0, 100),
      stability,
      projection,
      aiFeedback,
      previewAudio: mp3Buffer.toString("base64"), // Optional: user playback
      voiceFeedback: feedbackAudioBase64, // 👈 Base64 TTS audio
    });
  } catch (err) {
    console.error("❌ Temp audio analysis failed:", err);
    return sendResponse(res, false, 500, "Internal error", { error: err.message });
  }
};




















// 📁 controllers/audioController.js
export const getUserAudios = async (req, res) => {
  try {
    const { userId } = req.params;

    const audios = await Audio.find({ user_id: userId }).sort({ createdAt: -1 });

    return sendResponse(res, true, 200, "Fetched user's recordings", audios);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return sendResponse(res, false, 500, "Failed to fetch recordings", { error: err.message });
  }
};


// 📁 controllers/audioController.js
export const deleteAudio = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Audio.findByIdAndDelete(id);

    if (!deleted) {
      return sendResponse(res, false, 404, "Audio not found");
    }

    return sendResponse(res, true, 200, "Audio deleted successfully");
  } catch (err) {
    console.error("❌ Delete error:", err);
    return sendResponse(res, false, 500, "Failed to delete audio", { error: err.message });
  }
};



// 📁 controllers/audioController.js


export const downloadAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const audio = await Audio.findById(id);

    if (!audio) {
      return sendResponse(res, false, 404, "Audio not found");
    }

    // Assuming audio.url is a public cloud URL (e.g. Cloudinary or S3)
    const response = await axios.get(audio.url, { responseType: "stream" });

    res.setHeader("Content-Disposition", `attachment; filename="${audio.title}.mp3"`);
    response.data.pipe(res);
  } catch (err) {
    console.error("❌ Download error:", err);
    return sendResponse(res, false, 500, "Failed to download audio", { error: err.message });
  }
};
