exports.getVideoInfo = async (url) => {
  return {
    success: true,
    message: "Video service is working",
    url,
    timestamp: new Date().toISOString(),
  };
};
