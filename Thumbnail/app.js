import express from "express";
import * as url from "url";
import multer from "multer";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

const app = express();

// Getting current directory name
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

ffmpeg.setFfmpegPath(ffmpegPath);

// uploads files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "images";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Express middlewares
app.use(express.json())
app.use(express.static("images"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post("/generateThumbnail", upload.single("video"), (req, res) => {
  const outputPath = Date.now() + "-thumbnail.png";

  ffmpeg(req.file.path)
    .seekInput(req.body.time)
    .frames(1)
    .output(outputPath)
    .on("end", () => {
      res.download(outputPath, (err) => {
        if (err) console.error("Error during download:", err.message);
      });
    })
    .on("error", (err) => {
      console.error("Error generating thumbnail:", err.message);
      res.status(500).send("Error generating thumbnail");
    })
    .run();
});

app.listen(3030, () => console.log("Server is running on Port 3030"));
