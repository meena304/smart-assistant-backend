const Content = require("../models/Content");
const { generateAIContent } = require("../utils/aiService");

exports.generateContent = async (req, res) => {
  try {
    const { text, type } = req.body;

    const output = await generateAIContent(text, type);

    const content = await Content.create({
      userId: req.user.id,
      inputText: text,
      outputText: output,
      type,
    });

    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI generation failed" });
    if (err.response?.status === 429) {
      res
        .status(500)
        .json({ message: "Too many requests! Please wait a moment." });
    } else {
      res.status(500).json({ message: "AI generation failed" });
    }
  }
};

exports.getHistory = async (req, res) => {
  const data = await Content.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(data);
};
