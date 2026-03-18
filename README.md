# Portfolio Showcase (Frontend) 🚀

This is the frontend component of a decoupled, high-performance portfolio architecture.

## 🏗️ The Decoupled Architecture

This project is split into three main parts to ensure scalability, speed, and security:

1.  **Vercel (Frontend)**:
    *   **Role**: UI & Interaction Layer.
    *   **Tech**: Next.js 14, Tailwind CSS, Framer Motion.
    *   **Function**: Provides the beautiful, responsive interface. It communicates with the Railway backend for AI features to avoid serverless function timeouts.

2.  **Railway (Backend)**:
    *   **Role**: AI Processing & Logic Engine.
    *   **Tech**: Node.js (Express), Docker, AI SDK (Groq/Mistral/DeepSeek).
    *   **Function**: Handles intensive AI streaming tasks. By using a persistent Docker container on Railway (APAC region), it bypasses common serverless time limits.

3.  **Supabase (Database)**:
    *   **Role**: Persistent Storage & Analytics.
    *   **Tech**: PostgreSQL.
    *   **Function**: Stores `ai_logs` and other persistent data. It acts as the "memory" of the entire system.

## 🚀 Deployment
*   **Production URL**: [portfolio-ver-lime.vercel.app](https://portfolio-ver-lime.vercel.app/)
*   **Architecture**: Decoupled (Vercel + Railway + Supabase)

---
Built with ❤️ by Fitra RH
