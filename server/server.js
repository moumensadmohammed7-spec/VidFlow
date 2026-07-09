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
    version: "2.0.0",
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
      skipDownload: true,
    });

    const formats = (info.formats || [])
      .filter(
        (f) =>
          f.vcodec !== "none" &&
          f.height &&
          f.url
      )
      .map((f) => ({
        format_id: f.format_id,
        quality: `${f.height}p`,
        ext: f.ext,
        fps: f.fps,
        filesize: f.filesize || null,
      }));

    res.json({
      success: true,
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      uploader: info.uploader,
      webpage_url: info.webpage_url,
      formats,
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

const PORT = process.env.PORT || 3001;
app.post("/download-file", async (req, res) => {
  try {
    const { url, format_id } = req.body;

    if (!url || !format_id) {
      return res.status(400).json({
        success: false,
        message: "Missing url or format_id",
      });
    }

    const output = await runYtDlp([
      url,
      "-f",
      format_id,
      "-g",
      "--no-warnings",
    ]);

    const downloadUrl = output.trim();

    if (!downloadUrl) {
      return res.status(404).json({
        success: false,
        message: "Download URL not found",
      });
    }

    return res.json({
      success: true,
      download_url: downloadUrl,
      filename: "video.mp4",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }
});