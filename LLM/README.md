# AI Chat Backend API

This is the backend API for the AI chat feature using Flask and Groq AI.

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
