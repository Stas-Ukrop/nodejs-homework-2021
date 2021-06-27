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

const app = express();
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api", rateLimit(ApiLimiter));
app.use("/api", require("./routes/api"));

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json(
      createResponse(Status.ERROR, HttpCode.NOT_FOUND, {
        message: Message.NOT_FOUND,
      })
    );
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res
    .status(status)
    .json(createResponse(Status.FAIL, status, { message: err.message }));
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

module.exports = app;
