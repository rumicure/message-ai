app.post('/api/message', async (req, res) => {  const userInput = req.body.text;
  const systemPrompt = `文章をチェックして、より相手に伝わりやすい文章に訂正して
やさしい日本語で整えてください。`;
  try {    const chatCompletion = await openai.chat.completions.create({      model: "gpt-4",      messages: [        { role: "system", content: systemPrompt },        { role: "user", content: userInput }      ]    });
    const aiMessage = chatCompletion.choices[0].message.content;    res.json({ result: aiMessage });  } catch (error) {    console.error("エラー:", error);    res.status(500).json({ error: "APIエラーが発生しました" });  }});