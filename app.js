const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {
  HttpCode,
  Message,
  Status,
  ApiLimiter,
  createResponse,
} = require("./helpers/constants");
const path = require("path");
require("dotenv").config();
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

const app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, AVATAR_OF_USERS)));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api", rateLimit(ApiLimiter));
app.use("/api", require("./routes/api"));

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json(
    createResponse(Status.ERROR, HttpCode.NOT_FOUND, {
      message: Message.NOT_FOUND,
    })
  );
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res
    .status(status)
    .json(
      createResponse(
        status === HttpCode.INTERNAL_SERVER_ERROR ? Status.FAIL : Status.ERROR,
        status,
        { message: err.message }
      )
    );
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

module.exports = app;
