exports.health = (req, res) => {
  res.json({
    success: true,
    message: "VidFlow Backend is running",
    version: "1.0.0"
  });
};
