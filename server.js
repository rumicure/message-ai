// server.js
require('dotenv').config(); // 環境変数の読み込みconst express = require('express');const cors = require('cors');const { OpenAI } = require('openai');
// ここで express アプリを作成const app = express();
// ミドルウェアの設定app.use(cors());app.use(express.json());
// OpenAI の初期化const openai = new OpenAI({  apiKey: process.env.OPENAI_API_KEY});
// POSTエンドポイントapp.post('/api/message', async (req, res) => {  const userInput = req.body.text;  const systemPrompt = `文章をチェックして、より相手に伝わりやすい文章に訂正してやさしい日本語で整えてください。`;
  try {    const chatCompletion = await openai.chat.completions.create({      model: "gpt-4",      messages: [        { role: "system", content: systemPrompt },        { role: "user", content: userInput }      ]    });
    const aiMessage = chatCompletion.choices[0].message.content;    res.json({ result: aiMessage });
  } catch (error) {    console.error("エラー:", error);    res.status(500).json({ error: "APIエラーが発生しました" });  }});
// サーバー起動app.listen(3000, () => {  console.log('サーバーが http://localhost:3000 で起動しました');});
