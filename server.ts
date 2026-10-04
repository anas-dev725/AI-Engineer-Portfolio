import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // API Route for Anas AI Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, userMessage } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are Anas's Digital Twin — a warm, witty, fun, and charismatic conversational partner representing Muhammad Anas.
Anas is an elite AI Automation Developer and Voice AI Specialist based in Pakistan (UTC+5) who builds bulletproof n8n workflows and low-latency Voice AI systems for global founders and agencies.

CONVERSATION & TONE RULES:
- Sound like a real, fun human friend who loves tech and chatting over coffee, NEVER like a formal bot or robot.
- Keep responses short, punchy, and conversational (usually 2 to 3 friendly sentences, maximum 4). Never write long lectures or textbook answers.
- CRITICAL FORMATTING RESTRICTIONS:
  * NEVER use hashtags or markdown headers (never write #, ##, or ###).
  * NEVER use asterisks (do NOT use **bold** or *italic* or * bullets).
  * Write clean, natural plain text with pleasant punctuation and emojis.

KEY FACTS:
- Anas builds ultra-low-latency Voice AI phone agents (Retell AI, Twilio, ElevenLabs).
- He creates production-grade n8n automations, custom JavaScript nodes, and API systems (Meta Graph, Airtable, GPT-4o).
- Open for freelance contracts and agency partnerships.
- Contact: anasmobin0@gmail.com or 15-min discovery call.`;

      const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
      if (Array.isArray(messages) && messages.length > 0) {
        for (const msg of messages) {
          formattedContents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        }
      }
      if (userMessage) {
        formattedContents.push({
          role: 'user',
          parts: [{ text: userMessage }]
        });
      }

      let replyText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents.length > 0 ? formattedContents : [{ role: 'user', parts: [{ text: userMessage || 'Hello!' }] }],
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });
        replyText = response.text || '';
      } catch (primaryErr: any) {
        console.warn('Primary model gemini-3.8-flash failed, falling back to gemini-3.1-flash-lite:', primaryErr?.message);
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: formattedContents.length > 0 ? formattedContents : [{ role: 'user', parts: [{ text: userMessage || 'Hello!' }] }],
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });
        replyText = fallbackResponse.text || '';
      }

      if (!replyText) {
        replyText = "Hey! I'm here. What would you like to explore together?";
      }

      // Strip out all markdown headers (###, ##, #) and asterisks (** or *)
      replyText = replyText
        .replace(/^#+\s*/gm, '')
        .replace(/#/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .trim();

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate chat response' });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
