const express = require("express");
const cors = require("cors");
const ytDlp = require("yt-dlp-exec");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "VidFlow API",
    status: "online",
    version: "1.0.0",
  });
});

app.post("/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "No URL provided",
      });
    }

    const info = await ytDlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      skipDownload: true,
    });

    res.json({
      success: true,
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      uploader: info.uploader,
      webpage_url: info.webpage_url,
    });
  } catch (error) {
    console.error("DOWNLOAD ERROR:");
    console.error(error);
     console.error(error?.stack);

    res.status(500).json({
      success: false,
      message: "Failed to extract video information",
      error: error.message,
    });
  }
});

const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`VidFlow API running on port ${PORT}`);
});
