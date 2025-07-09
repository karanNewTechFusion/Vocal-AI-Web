// import multer from "multer";
// import fs from "fs";
// import { v4 as uuidv4 } from "uuid";
// import ffmpeg from "fluent-ffmpeg";
// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
// import { Readable } from "stream";
// import { decode } from "wav-decoder";
// import { AMDF } from "pitchfinder";
// import { std } from "mathjs";
// import { sendResponse } from "../utility/responseHelper.js";
// import dotenv from "dotenv";
// import Audio from "../models/Audio.js";
// import { uploadFileToStorage } from "../utility/storageHelper.js";
// import { generateSingingFeedback } from "../utility/aiFeedbackHelper.js";
// import { generateFeedbackTTS } from "../utility/generateTTS.js";
// import axios from "axios";
// dotenv.config();

// // Setup
// ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// export const uploadAudioMiddleware = upload.single("audio");

// // Convert WebM to MP3
// function convertToMp3(buffer) {
//   return new Promise((resolve, reject) => {
//     const stream = new Readable();
//     stream.push(buffer);
//     stream.push(null);

//     const chunks = [];
//     ffmpeg(stream)
//       .inputFormat("webm")
//       .audioCodec("libmp3lame")
//       .format("mp3")
//       .on("error", reject)
//       .pipe()
//       .on("data", (chunk) => chunks.push(chunk))
//       .on("end", () => resolve(Buffer.concat(chunks)));
//   });
// }

// // Convert MP3 to WAV
// function convertToWav(buffer) {
//   return new Promise((resolve, reject) => {
//     const tmpInput = `input-${uuidv4()}.mp3`;
//     const tmpOutput = `output-${uuidv4()}.wav`;
//     fs.writeFileSync(tmpInput, buffer);

//     ffmpeg(tmpInput)
//       .toFormat("wav")
//       .on("end", () => {
//         const wavBuffer = fs.readFileSync(tmpOutput);
//         fs.unlinkSync(tmpInput);
//         fs.unlinkSync(tmpOutput);
//         resolve(wavBuffer);
//       })
//       .on("error", reject)
//       .save(tmpOutput);
//   });
// }

// // Extract RMS volume
// function extractRMS(buffer) {
//   return new Promise((resolve, reject) => {
//     const tmpFile = `tmp-${uuidv4()}.mp3`;
//     fs.writeFileSync(tmpFile, buffer);

//     ffmpeg(tmpFile)
//       .audioFilters("volumedetect")
//       .format("null")
//       .on("stderr", (line) => {
//         const match = line.match(/mean_volume: ([-\d.]+) dB/);
//         if (match) {
//           resolve(parseFloat(match[1]));
//         }
//       })
//       .on("end", () => fs.unlinkSync(tmpFile))
//       .on("error", reject)
//       .save(process.platform === "win32" ? "NUL" : "/dev/null");
//   });
// }

// // Decode pitch
// function decodePitch(wavBuffer) {
//   return decode(wavBuffer).then((audioData) => {
//     const channelData = audioData.channelData[0];
//     const detectPitch = AMDF();
//     const pitches = [];

//     for (let i = 0; i < channelData.length; i += 1024) {
//       const slice = channelData.slice(i, i + 1024);
//       const pitch = detectPitch(slice);
//       if (pitch) pitches.push(pitch);
//     }

//     return pitches;
//   });
// }

// // 🚀 Main controller
// export const finalizeAndSaveAudio = async (req, res) => {
//   try {
//     const { file } = req;
//     const { title, user_id } = req.body;

//     if (!file || !title || !user_id) {
//       return sendResponse(res, false, 400, "Missing required fields");
//     }

//     const mp3Buffer = await convertToMp3(file.buffer);
//     const fileName = `${uuidv4()}.mp3`;
//     const fileUrl = await uploadFileToStorage(mp3Buffer, fileName);

//     if (!fileUrl) {
//       return sendResponse(res, false, 500, "Failed to upload audio file");
//     }

//     const wavBuffer = await convertToWav(mp3Buffer);
//     const pitches = await decodePitch(wavBuffer);
//     const stability = std(pitches);
//     const projection = await extractRMS(mp3Buffer);

//     const audioDoc = await Audio.create({
//       title,
//       url: fileUrl,
//       user_id,
//       pitchData: pitches.slice(0, 100),
//       stability,
//       projection,
//     });

//     return sendResponse(res, true, 200, "Audio uploaded & analyzed", audioDoc);
//   } catch (err) {
//     console.error("❌ Audio processing failed:", err);
//     return sendResponse(res, false, 500, "Internal server error", {
//       error: err.message,
//     });
//   }
// };

// Updated: Audio analysis with 0–100 normalization
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
import { generateFeedbackTTS } from "../utility/generateTTS.js";
import axios from "axios";
dotenv.config();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadAudioMiddleware = upload.single("audio");

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

function extractRMS(buffer) {
  return new Promise((resolve, reject) => {
    const tmpFile = `tmp-${uuidv4()}.mp3`;
    fs.writeFileSync(tmpFile, buffer);
    ffmpeg(tmpFile)
      .audioFilters("volumedetect")
      .format("null")
      .on("stderr", (line) => {
        const match = line.match(/mean_volume: ([-\d.]+) dB/);
        if (match) resolve(parseFloat(match[1]));
      })
      .on("end", () => fs.unlinkSync(tmpFile))
      .on("error", reject)
      .save(process.platform === "win32" ? "NUL" : "/dev/null");
  });
}

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

// 🎯 Normalization Functions
function normalizePitch(pitchArray) {
  if (!pitchArray.length) return 0;
  const avgPitch = pitchArray.reduce((a, b) => a + b, 0) / pitchArray.length;
  const minPitch = 220;
  const maxPitch = 440;
  const clamped = Math.min(Math.max(avgPitch, minPitch), maxPitch);
  return Math.round(((clamped - minPitch) / (maxPitch - minPitch)) * 100);
}

function normalizeStability(stdDev) {
  const maxUnstable = 100;
  return Math.round(100 - (Math.min(stdDev, maxUnstable) / maxUnstable) * 100);
}

function normalizeProjection(dB) {
  const minDb = -60;
  const maxDb = -10;
  const clamped = Math.min(Math.max(dB, minDb), maxDb);
  return Math.round(((clamped - minDb) / (maxDb - minDb)) * 100);
}

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
    if (!fileUrl) return sendResponse(res, false, 500, "Failed to upload audio file");

    const wavBuffer = await convertToWav(mp3Buffer);
    const pitches = await decodePitch(wavBuffer);
    const stability = std(pitches);
    const projection = await extractRMS(mp3Buffer);

    const pitchScore = normalizePitch(pitches);
    const stabilityScore = normalizeStability(stability);
    const projectionScore = normalizeProjection(projection);

    const audioDoc = await Audio.create({
      title,
      url: fileUrl,
      user_id,
      pitchData: pitches.slice(0, 100),
      stability: stabilityScore,
      projection: projectionScore,
    });

    return sendResponse(res, true, 200, "Audio uploaded & analyzed", audioDoc);
  } catch (err) {
    console.error("❌ Audio processing failed:", err);
    return sendResponse(res, false, 500, "Internal server error", {
      error: err.message,
    });
  }
};


export const analyzeTempAudio = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return sendResponse(res, false, 400, "Audio file is required");
    }

    const mp3Buffer = await convertToMp3(file.buffer);
    const fileName = `${uuidv4()}.mp3`;
    const fileUrl = await uploadFileToStorage(mp3Buffer, fileName);

    if (!fileUrl) {
      return sendResponse(res, false, 500, "Audio upload failed");
    }

    const wavBuffer = await convertToWav(mp3Buffer);
    const pitches = await decodePitch(wavBuffer);
    const stability = std(pitches);
    const projection = await extractRMS(mp3Buffer);

    // 🌟 Generate AI feedback from Gemini using audio URL
    const aiFeedback = await generateSingingFeedback(fileUrl);

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
      previewAudio: mp3Buffer.toString("base64"),
      voiceFeedback: feedbackAudioBase64,
    });
  } catch (err) {
    console.error("❌ Temp audio analysis failed:", err);
    return sendResponse(res, false, 500, "Internal error", {
      error: err.message,
    });
  }
};

export const getUserAudios = async (req, res) => {
  try {
    const { userId } = req.params;

    const audios = await Audio.find({ user_id: userId }).sort({
      createdAt: -1,
    });

    return sendResponse(res, true, 200, "Fetched user's recordings", audios);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return sendResponse(res, false, 500, "Failed to fetch recordings", {
      error: err.message,
    });
  }
};

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
    return sendResponse(res, false, 500, "Failed to delete audio", {
      error: err.message,
    });
  }
};

export const downloadAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const audio = await Audio.findById(id);

    if (!audio) {
      return sendResponse(res, false, 404, "Audio not found");
    }

    const response = await axios.get(audio.url, { responseType: "stream" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${audio.title}.mp3"`
    );
    response.data.pipe(res);
  } catch (err) {
    console.error("❌ Download error:", err);
    return sendResponse(res, false, 500, "Failed to download audio", {
      error: err.message,
    });
  }
};

export const getAudioSummary = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming auth middleware sets `req.user`

    const audios = await Audio.find({ user_id }).sort({ createdAt: 1 });
    if (!audios.length) {
      return sendResponse(res, true, 200, "No audio data found", {
        improvementRate: 0,
        sessionsThisMonth: 0,
        bestScore: 0,
        goalsAchieved: 0,
        totalGoals: 5,
        skills: {
          pitch: 0,
          stability: 0,
          articulation: 0,
          projection: 0,
        },
        distribution: {
          pitch: 0,
          stability: 0,
          articulation: 0,
          projection: 0,
        },
      });
    }

    // 📌 Calculate
    const now = new Date();
    const sessionsThisMonth = audios.filter((a) => {
      const d = new Date(a.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    const flatten = audios.flatMap((a) => a.pitchData || []);
    const pitchAvg = flatten.length ? flatten.reduce((a, b) => a + b, 0) / flatten.length : 0;
    const stabilityAvg = audios.reduce((sum, a) => sum + (a.stability || 0), 0) / audios.length;
    const projectionAvg = audios.reduce((sum, a) => sum + (a.projection || 0), 0) / audios.length;

    const bestScore = Math.round(
      Math.max(...audios.map((a) => {
        const pitches = a.pitchData || [];
        return pitches.length ? (pitches.reduce((x, y) => x + y, 0) / pitches.length) : 0;
      }))
    );

    // 📊 Placeholder logic (customize later)
    const improvementRate = 0.23;
    const goalsAchieved = 3;
    const totalGoals = 5;

    return sendResponse(res, true, 200, "Audio summary fetched", {
      improvementRate,
      sessionsThisMonth,
      bestScore,
      goalsAchieved,
      totalGoals,
      skills: {
        pitch: parseFloat((pitchAvg / 100).toFixed(2)),
        stability: parseFloat(stabilityAvg.toFixed(2)),
        articulation: 0.7, // placeholder if you don't calculate it yet
        projection: parseFloat(projectionAvg.toFixed(2)),
      },
      distribution: {
        pitch: 35,
        stability: 25,
        articulation: 20,
        projection: 20,
      },
    });
  } catch (err) {
    console.error("❌ Error in getAudioSummary:", err);
    return sendResponse(res, false, 500, "Failed to fetch summary", {
      error: err.message,
    });
  }
};

export const getMonthlyProgress = async (req, res) => {
  try {
    const user_id = req.user.id;

    const audios = await Audio.find({ user_id });

    if (!audios.length) {
      return sendResponse(res, true, 200, "No data", []);
    }

    // Group by month (last 6 months)
    const now = new Date();
    const months = [...Array(6)].map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse(); // [Feb, Mar, Apr, May, Jun, Jul]

    const result = months.map((month) => ({
      name: month,
      sessions: 0,
      score: 0,
    }));

    for (const audio of audios) {
      const d = new Date(audio.createdAt);
      const monthName = d.toLocaleString('default', { month: 'short' });

      const index = result.findIndex((m) => m.name === monthName);
      if (index !== -1) {
        result[index].sessions += 1;
        const pitches = audio.pitchData || [];
        const avg = pitches.length ? pitches.reduce((a, b) => a + b, 0) / pitches.length : 0;
        result[index].score += avg;
      }
    }

    // Finalize average score
    result.forEach((m) => {
      if (m.sessions > 0) m.score = Math.round(m.score / m.sessions);
    });

    return sendResponse(res, true, 200, "Monthly progress fetched", result);
  } catch (err) {
    console.error("❌ getMonthlyProgress error:", err);
    return sendResponse(res, false, 500, "Failed to fetch monthly progress", {
      error: err.message,
    });
  }
};

export const getPitchTrend = async (req, res) => {
  try {
    const user_id = req.user.id;

    const audios = await Audio.find({ user_id }).sort({ createdAt: 1 });

    if (!audios.length) {
      return sendResponse(res, true, 200, "No audio sessions", []);
    }

    const trend = audios.map((a) => {
      const date = new Date(a.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
      const pitches = a.pitchData || [];
      const avg = pitches.length ? pitches.reduce((x, y) => x + y, 0) / pitches.length : 0;

      return {
        date,
        value: parseFloat(avg.toFixed(2)), // pitch score
      };
    });

    return sendResponse(res, true, 200, "Pitch trend generated", trend);
  } catch (err) {
    console.error("❌ getPitchTrend error:", err);
    return sendResponse(res, false, 500, "Failed to fetch pitch trend", {
      error: err.message,
    });
  }
};

export const getUserAchievements = async (req, res) => {
  try {
    const user_id = req.user.id;
    const audios = await Audio.find({ user_id }).sort({ createdAt: 1 });

    const achievements = [];

    if (!audios.length) {
      return sendResponse(res, true, 200, "No achievements yet", []);
    }

    // 🎯 Achievement 1: Pitch Perfect (any session with avg pitch > 90)
    const pitchPerfect = audios.some((a) => {
      const pitches = a.pitchData || [];
      const avg = pitches.length ? (pitches.reduce((x, y) => x + y, 0) / pitches.length) : 0;
      return avg > 90;
    });
    if (pitchPerfect) {
      achievements.push({
        title: "Pitch Perfect",
        description: "Achieved 90%+ pitch accuracy",
        icon: "medal", // Map in frontend
      });
    }

    // 🔁 Achievement 2: 7-Day Streak
    const dateSet = new Set(
      audios.map((a) => new Date(a.createdAt).toISOString().split("T")[0])
    );
    let streak = 0;
    let day = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(day);
      const dateStr = d.toISOString().split("T")[0];
      if (dateSet.has(dateStr)) {
        streak++;
      } else break;
      day.setDate(day.getDate() - 1);
    }

    if (streak === 7) {
      achievements.push({
        title: "Consistent Performer",
        description: "7-day practice streak",
        icon: "activity",
      });
    }

    // 🎙️ Achievement 3: 25 Sessions
    if (audios.length >= 25) {
      achievements.push({
        title: "Vocal Master",
        description: "Completed 25 sessions",
        icon: "mic",
      });
    }

    return sendResponse(res, true, 200, "Achievements loaded", achievements);
  } catch (err) {
    console.error("❌ getUserAchievements error:", err);
    return sendResponse(res, false, 500, "Failed to fetch achievements", {
      error: err.message,
    });
  }
};
