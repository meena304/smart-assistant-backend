const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

exports.generateAIContent = async (text, type) => {
  let prompt = "";

  if (type === "summary") {
    prompt = `Summarize this text:\n${text}`;
  } else if (type === "rewrite") {
    prompt = `Rewrite this text in a professional tone:\n${text}`;
  } else if (type === "bullets") {
    prompt = `Convert this into key bullet points:\n${text}`;
  }

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};
