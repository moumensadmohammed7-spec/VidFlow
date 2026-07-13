const express = require("express");
const router = express.Router();

const { health } = require("../controllers/healthController");
const { info } = require("../controllers/videoController");

router.get("/health", health);
router.post("/video/info", info);

module.exports = router;
