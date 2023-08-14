import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { regester } from "./controllers/auth.js";

/* Configirations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File storage config */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/assets");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

/* Routes with files */
// us set the routes taht suing files here to use the upload metod
app.post("/auth/regester", upload.single("picture"), regester);

/* Routes without files */
app.use("/auth", authRoutes);

/* Mongoose Setup */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("connected on prot: " + PORT));
  })
  .catch((error) => console.log(PORT + "did not connect!"));
