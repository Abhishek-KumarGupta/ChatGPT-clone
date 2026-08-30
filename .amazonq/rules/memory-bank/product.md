# Product Overview

## Project Purpose
A full-stack ChatGPT clone that replicates core conversational AI functionality using the OpenAI API. The app allows users to have persistent, multi-turn conversations with an AI assistant, with chat history organized into threads.

## Value Proposition
- Provides a familiar ChatGPT-like interface built from scratch
- Persists conversation threads in MongoDB so history survives page reloads
- Renders AI responses with full Markdown and syntax-highlighted code blocks

## Key Features
- **Multi-turn conversations**: Messages are grouped into threads with persistent history
- **Thread management**: Sidebar lists all past threads by title; new chat creates a fresh thread
- **Markdown rendering**: AI replies rendered via react-markdown with rehype-highlight for code
- **Loading states**: Spinner feedback while awaiting AI responses
- **Auto-generated thread titles**: Backend derives a title from the first message of each thread
- **RESTful API**: Clean separation between frontend and backend via HTTP endpoints

## Target Users
- Developers learning to build AI-powered chat applications
- Personal use as a self-hosted ChatGPT alternative
- Portfolio/demo project showcasing full-stack React + Node.js + OpenAI integration

## Use Cases
- Asking coding questions with syntax-highlighted responses
- General Q&A with persistent history across sessions
- Exploring OpenAI Assistants API with threads and runs
