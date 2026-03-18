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

// Database Test
app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('ai_logs').insert({
      feature_id: 'test-endpoint',
      prompt: 'Is database connected?',
      completion: 'Yes, it works!',
      model: 'system-test'
    });
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    console.error('Test DB Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Generic AI Chat Endpoint with Streaming and Logging
app.post('/api/chat', async (req, res) => {
  const { messages, featureId } = req.body;

  try {
    console.log(`[AI Request] feature: ${featureId}, messages: ${messages?.length}`);

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages,
      onFinish: async (completion) => {
        const lastMessage = messages[messages.length - 1]?.content || 'N/A';
        console.log(`[AI Finish] Stream ended. Attempting log for: "${lastMessage.substring(0, 30)}..."`);
        
        try {
          const { error } = await supabase.from('ai_logs').insert({
            feature_id: featureId || 'general',
            prompt: lastMessage,
            completion: completion.text,
            model: 'llama-3.1-8b-instant'
          });
          
          if (error) {
            console.error(`[Supabase Error] Insert failed: ${error.message}`);
          } else {
            console.log(`[Supabase Success] Row inserted for feature: ${featureId}`);
          }
        } catch (dbErr) {
          console.error(`[Fatal DB Error] ${dbErr.message}`);
        }
      }
    });

    result.pipeTextStreamToResponse(res);
  } catch (error) {
    console.error('Backend AI Error:', error);
    res.status(500).json({ error: 'Failed to process AI request on Railway.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production Backend Live on port ${PORT}`);
});
