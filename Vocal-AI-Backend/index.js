// import express, { response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes.js";
// import audioRoutes from "./routes/audioRoutes.js";
// import dbConnection from "./db/db.connect.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// dbConnection();
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       callback(null, true);
//     },
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.json({ message: "API working...." });
// });
// app.use("/api/users", userRoutes);
// app.use("/api/audio", audioRoutes); //

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on http://0.0.0.0:${PORT}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import dbConnection from "./db/db.connect.js";
dbConnection();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow only specific frontend origins
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://vocal-ai-web.vercel.app", // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ allows cookies, Authorization headers, etc.
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API working...." });
});
app.use("/api/users", userRoutes);
app.use("/api/audio", audioRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
