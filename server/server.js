const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const app = express();
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

app.listen(keys.PORT, () => {
  console.log(`Express running → PORT: ${keys.PORT}`);
});
