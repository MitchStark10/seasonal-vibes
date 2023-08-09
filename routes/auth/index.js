const express = require("express");
const app = express();

app.use("/login", require("./login"));
app.use("/callback", require("./callback"));

module.exports = app;
