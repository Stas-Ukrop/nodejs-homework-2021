const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 3,
});
mongoose.connection.on("connected", () => {
  console.log("cotection open");
});

mongoose.connection.on("error", (e) => {
  console.log(`Error mongoose connection ${e.message}`);
});
mongoose.connection.on("disconnected", (e) => {
  console.log(`Disconnected ${e.message}`);
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Database connection successful");
    process.exit(1);
  });
});

module.exports = db;
