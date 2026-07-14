const ytDlp = require("yt-dlp-exec");

exports.getVideoInfo = async (url) => {
  try {
    const info = await ytDlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      skipDownload: true,
    });

    return {
      success: true,
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      uploader: info.uploader,
      webpage_url: info.webpage_url,
      formats: (info.formats || [])
        .filter((f) => f.vcodec !== "none" && f.height)
        .map((f) => ({
          format_id: f.format_id,
          quality: `${f.height}p`,
          ext: f.ext,
        })),
    };
  } catch (err) {
    const message = err.message || "";

    if (message.includes("Sign in to confirm you're not a bot")) {
      throw new Error("YouTube temporarily rejected the request.");
    }

    if (message.includes("Your IP address is blocked")) {
      throw new Error("TikTok temporarily rejected the request.");
    }

    console.error("yt-dlp error:", err.message);
    throw new Error("Unable to retrieve video information.");
  }
};
