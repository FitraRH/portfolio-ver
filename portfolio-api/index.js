const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const { groq } = require('@ai-sdk/groq');
const { streamText } = require('ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middlewares
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const SYSTEM_PROMPT = `IMPORTANT: Detect the language of the user's message. Reply ONLY in that exact language.
You are "Fitra AI", a professional assistant on Fitra's portfolio.
Current Architecture: Decoupled (Vercel + Railway + Supabase + Docker).
Specialty: AI Engineer, Computer Vision, Generative AI.`;

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'live', engine: 'docker-alpine', region: 'APAC' });
});

// Generic AI Chat Endpoint with Streaming and Logging
app.post('/api/chat', async (req, res) => {
  const { messages, featureId } = req.body;

  try {
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages,
      onFinish: async (completion) => {
        // Log to Supabase after completion
        try {
          await supabase.from('ai_logs').insert({
            feature_id: featureId || 'general',
            prompt: messages[messages.length - 1].content,
            completion: completion.text,
            model: 'llama-3.1-8b-instant',
            timestamp: new Date().toISOString()
          });
        } catch (dbError) {
          console.error('Database logging error:', dbError);
        }
      }
    });

    return result.toTextStreamResponse(res);
  } catch (error) {
    console.error('Backend AI Error:', error);
    res.status(500).json({ error: 'Failed to process AI request on Railway.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production Backend Live on port ${PORT}`);
});
