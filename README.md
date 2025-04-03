# AI-Powered Chatbot with Retrieval-Augmented Generation (RAG)

## Overview

This is a full-stack AI-powered chatbot that utilizes Retrieval-Augmented Generation (RAG) to provide accurate responses by retrieving relevant context from a knowledge base before generating answers. The chatbot is designed for an imaginary fintech company and helps users with FAQs related to account registration, payments, security, compliance, and technical support.

## Features

- **FastAPI Backend (Python)**

  - RESTful API endpoints for chat functionality.
  - Integration with Pinecone for vector-based retrieval.
  - AI responses powered by Gemini.
  - JWT-based authentication for returning users.
  - Chat history persistence in MySQL.

- **Frontend (React + Vite + TypeScript)**

  - Fast and optimized UI with Vite.
  - User-friendly chat interface inspired by OpenAI's ChatGPT UI.
  - Support for anonymous and returning users.
  - Chat history retrieval for a seamless user experience.

- **RAG-Based Chatbot**

  - Fetches relevant knowledge before generating responses.
  - Reduces AI hallucinations and improves answer accuracy.

- **Dockerized Setup**

  - Backend and frontend containerized using Docker.
  - MySQL database container for easy setup.
  - Docker Compose for local development.

- **Scalability & AWS Deployment**
  - Designed for deployment on AWS using best DevOps practices.
  - Environment configuration management for production readiness.

## Setup Instructions

### 1. Clone the Repository

```
git clone git@github.com:muiux/fintech-chatbot.git
cd fintech-chatbot
```

### 2. Environment Variables

#### Backend (api/ Directory)

Navigate to api/ and create a .env file:

```
cp .env.example .env
```

#### Frontend (ui/ Directory)

1. Navigate to ui/ and create a .env file:

```
cp .env.example .env
```

2. This file is for local use only and not used in Docker.

### 3. Running with Docker

Ensure you have Docker and Docker Compose installed.

```
docker compose up --build
```

This will:

- Start the FastAPI backend on port 8000

- Start the Vite React frontend on port 5173

- Start the MySQL database container

## API Endpoints

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `POST` | `/chat`          | Send user message and get AI response |
| `GET`  | `/chat/history`  | Retrieve user chat history            |
| `POST` | `/auth/login`    | Authenticate returning users          |
| `POST` | `/auth/register` | Register new users                    |

## Technologies Used

- Backend: FastAPI, Python, Pinecone, Gemini, MySQL

- Frontend: React (Vite), TypeScript, MUI, React Query, Context API

- Deployment: Docker, AWS (ECS, RDS, Amplify, CloudFront)

- Security: JWT authentication, Environment configurations
