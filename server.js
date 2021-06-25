const express = require("express");
const path = require("path");
const defaultRoutes = require("./routes/defaultRoutes");

const app = express();
app.use(express.json());
app.use("/", defaultRoutes);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;