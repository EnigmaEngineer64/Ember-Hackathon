# ADHD-Friendly AI Chat Backend API

This backend API is specifically designed to provide ADHD-friendly responses using Flask and Groq AI.

## ADHD-Optimized Features

### System Prompt Integration
The API automatically prepends every conversation with instructions that ensure all AI responses are optimized for people with ADHD:

- **Short sentences** (max 15-20 words)
- **Clear headings** with emojis for visual organization
- **Bullet points and numbered lists** for easy scanning
- **Visual breaks** with proper spacing
- **Bold text** for key points
- **Direct, concise communication** style
- **Actionable steps** when applicable
- **Encouraging and positive tone**

### Response Structure
All AI responses follow this ADHD-friendly structure:
1. Brief summary first
2. Clear headings to organize content
3. Bullet points for details
4. Clear next steps when applicable

## Setup Instructions

### 1. Environment Setup

Make sure you have Python 3.12+ installed. This project uses uv for dependency management.

### 2. Install Dependencies

```bash
uv sync

# Or manually install with pip
pip install flask flask-cors groq python-dotenv
```

### 3. Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

   To get a Groq API key:
   - Visit [Groq Console](https://console.groq.com/)
   - Sign up or log in
   - Go to API Keys section
   - Create a new API key

### 4. Running the Server

```bash
# Activate virtual environment
# .venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Run the Flask server
python chatapi.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Chat
- **POST** `/chat`
- Body: `{"message": "your message", "session_id": "optional_session_id"}`
- Returns AI response

### Chat History
- **GET** `/chat/history/<session_id>`
- Returns conversation history for a session

### Clear Chat
- **DELETE** `/chat/clear/<session_id>`
- Clears conversation history for a session

## Features

- ✅ RESTful API with proper error handling
- ✅ CORS support for frontend integration
- ✅ Session-based conversation history
- ✅ Conversation context preservation
- ✅ Automatic message history management
- ✅ Health check endpoint
- ✅ Comprehensive logging

## Troubleshooting

1. **Import errors**: Make sure all dependencies are installed
2. **API key errors**: Verify your Groq API key is set correctly in `.env`
3. **CORS errors**: Ensure flask-cors is installed and CORS is enabled
4. **Port conflicts**: Change the port in `chatapi.py` if 5000 is already in use
