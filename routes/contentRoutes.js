const express = require("express");
const {
  generateContent,
  getHistory,
} = require("../controllers/ContentController");
const auth = require("../middleware/Auth");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  keyGenerator: (req) => req.user?.id,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many AI requests. Please wait a moment.",
    });
  },
});

const { createShare } = require("../controllers/ShareController");

router.post("/share/:id", auth, createShare);
router.post("/generate", auth, aiLimiter, generateContent);
router.get("/history", auth, getHistory);

module.exports = router;
