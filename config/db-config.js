const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/erp-db");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to db", err);
});

db.once("open", () => {
  console.log("Connected to DB");
});

module.exports = db;
