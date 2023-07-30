const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/api", (req, res) => {
  res
    .status(200)
    .json({ message: "API request succeeded. May the force be with you." });
});

router.use(express.static(path.join(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
router.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = router;
