from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Groq client
try:
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    logger.info("Groq client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Groq client: {e}")
    client = None

# Store conversation history (in production, use a proper database)
conversations = {}

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Chat API is running"})

@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint for AI conversations"""
    try:
        # Check if Groq client is available
        if not client:
            return jsonify({
                "error": "AI service unavailable",
                "message": "Please check API key configuration"
            }), 500

        # Get request data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        user_message = data.get('message', '').strip()
        session_id = data.get('session_id', 'default')
        
        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400

        # Initialize conversation history for new sessions
        if session_id not in conversations:
            conversations[session_id] = []

        # ADHD-friendly system prompt to optimize responses
        adhd_system_prompt = """You are an AI assistant specifically designed to help people with ADHD. Please follow these guidelines in ALL your responses:

📋 FORMATTING RULES:
• Use short sentences (max 15-20 words)
• Break information into small chunks
• Use bullet points and numbered lists
• Include clear headings with emojis
• Avoid long paragraphs (max 3-4 sentences)
• Use bold text for **key points**
• Include visual breaks with spacing

🎯 COMMUNICATION STYLE:
• Be direct and concise
• Start with the main point first
• Use simple, clear language
• Provide actionable steps
• Include encouraging and positive tone
• Avoid overwhelming details

📝 STRUCTURE:
• Start with a brief summary
• Use headings to organize content
• End with clear next steps if applicable

Remember: The person you're helping has ADHD, so clarity and brevity are essential."""

        # Add system prompt at the beginning if this is a new conversation
        if len(conversations[session_id]) == 1:  # Only user message exists
            conversations[session_id].insert(0, {"role": "system", "content": adhd_system_prompt})

        # Add user message to history
        conversations[session_id].append({"role": "user", "content": user_message})

        # Keep only last 12 messages (including system prompt) to prevent token overflow
        if len(conversations[session_id]) > 12:
            # Always keep the system prompt (first message) and recent messages
            system_prompt = conversations[session_id][0]
            recent_messages = conversations[session_id][-11:]
            conversations[session_id] = [system_prompt] + recent_messages

        # Create chat completion
        response = client.chat.completions.create(
            messages=conversations[session_id],
            model="gemma2-9b-it",
            max_tokens=1000,
            temperature=0.7
        )

        ai_response = response.choices[0].message.content.strip()
        
        # Add AI response to history
        conversations[session_id].append({"role": "assistant", "content": ai_response})

        return jsonify({
            "response": ai_response,
            "session_id": session_id,
            "message_count": len(conversations[session_id])
        })

    except Exception as e:
        logger.error(f"Chat error: {e}")
        return jsonify({
            "error": "Internal server error",
            "message": "Failed to process chat request"
        }), 500

@app.route('/chat/history/<session_id>', methods=['GET'])
def get_chat_history(session_id):
    """Get chat history for a session"""
    try:
        history = conversations.get(session_id, [])
        return jsonify({
            "session_id": session_id,
            "history": history,
            "message_count": len(history)
        })
    except Exception as e:
        logger.error(f"History retrieval error: {e}")
        return jsonify({"error": "Failed to retrieve chat history"}), 500

@app.route('/chat/clear/<session_id>', methods=['DELETE'])
def clear_chat_history(session_id):
    """Clear chat history for a session"""
    try:
        if session_id in conversations:
            del conversations[session_id]
        return jsonify({
            "message": f"Chat history cleared for session {session_id}"
        })
    except Exception as e:
        logger.error(f"History clearing error: {e}")
        return jsonify({"error": "Failed to clear chat history"}), 500

if __name__ == '__main__':
    # Check for API key
    if not os.environ.get("GROQ_API_KEY"):
        logger.warning("GROQ_API_KEY not found in environment variables")
        print("Warning: GROQ_API_KEY not set. Please add it to your .env file")
    
    print("Starting Chat API server...")
    print("Health check: http://localhost:5001/health")
    print("Chat endpoint: http://localhost:5001/chat")
    app.run(debug=True, host='0.0.0.0', port=5001)

