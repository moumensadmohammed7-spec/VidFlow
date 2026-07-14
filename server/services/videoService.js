const { execFile } = require("child_process");

function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    execFile(
      "yt-dlp",
      args,
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }
        resolve(stdout);
      }
    );
  });
}

exports.getVideoInfo = async (url) => {
  const output = await runYtDlp([
    url,
    "--dump-single-json",
    "--no-warnings",
    "--skip-download",
  ]);

  const info = JSON.parse(output);

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
};
