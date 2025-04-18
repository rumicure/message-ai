// server.js
require('dotenv').config();const express = require('express');const cors = require('cors');const { OpenAI } = require('openai');
const app = express();app.use(cors());app.use(express.json());
const openai = new OpenAI({  apiKey: process.env.OPENAI_API_KEY});
app.post('/api/message', async (req, res) => {  const userInput = req.body.text;  const systemPrompt = `文章をチェックして、より相手に伝わりやすい文章に訂正してやさしい日本語で整えてください。`;
  try {    const chatCompletion = await openai.chat.completions.create({      model: "gpt-4",      messages: [        { role: "system", content: systemPrompt },        { role: "user", content: userInput }      ]    });
    const aiMessage = chatCompletion.choices[0].message.content;    res.json({ result: aiMessage });
  } catch (error) {    console.error("エラー:", error);    res.status(500).json({ error: "APIエラーが発生しました" });  }});
app.listen(3000, () => {  console.log('サーバーが http://localhost:3000 で起動しました');});
