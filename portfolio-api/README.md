# Portfolio API (Backend) ⚙️

This is the backend component of a decoupled, high-performance portfolio architecture.

## 🏗️ The Decoupled Architecture

This is part of a 3-way split architecture for [Portfolio Showcase](https://portfolio-ver-lime.vercel.app/):

1.  **Vercel (Frontend)**:
    *   **Role**: UI & Interaction Layer.
    *   **Function**: Handles the visual presentation and frontend logic.

2.  **Railway (Backend)**:
    *   **Role**: AI Processing & Logic Engine.
    *   **Tech**: Node.js (Express), Docker, AI SDK (Groq/Mistral/DeepSeek).
    *   **Function**: Effectively bypasses Vercel’s serverless execution limits. It runs as a persistent Docker container, allowing for long-running AI streaming and complex logic processing. It logs usage statistics directly to Supabase.

3.  **Supabase (Database)**:
    *   **Role**: Persistent Storage & Analytics.
    *   **Function**: Central database for logging AI chat interactions (`ai_logs` table) and other persistent metrics.

## 🛠️ Tech Stack
*   **Engine**: Node.js v20 (Docker-based)
*   **AI SDK**: Vercel AI SDK (@ai-sdk/groq)
*   **Database**: @supabase/supabase-js
*   **Hosting**: Railway (Asia Pacific region)

---
Built with ❤️ by Fitra RH
