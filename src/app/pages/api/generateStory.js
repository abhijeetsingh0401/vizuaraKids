// pages/api/generateStory.js

import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  const { prompt } = req.body;
  console.log(req)
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Make sure you set this in your .env.local file
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "gpt-4o",
      prompt: prompt,
      max_tokens: 500,
    });

    const story = completion.data.choices[0].text.trim();
    res.status(200).json({ story });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate story' });
  }
}
