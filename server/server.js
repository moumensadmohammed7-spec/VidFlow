const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 VidFlow Backend running on port ${PORT}`);
});
