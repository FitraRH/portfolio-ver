const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Simulation Logging (Standard in Railway containers)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// AI Chat Endpoint (Mocking the Next.js API Router but in Express)
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured on backend' });
  }

  const systemPrompt = `You are "Fitra AI" on Railway backend. 
Respond professionally and mention that you are running on a Railway container if asked about your architecture. 
About Fitra: AI Engineer, Computer Vision expert.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: false // Simplified for simulation
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Railway Backend Error:', error);
    res.status(500).json({ error: 'Internal Server Error on Railway' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Railway Backend Simulator running on http://localhost:${PORT}`);
});
