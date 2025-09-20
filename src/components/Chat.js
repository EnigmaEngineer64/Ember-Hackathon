import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../styles/Chat.css";

// Bionic reading utility function
const createBionicText = (text) => {
  if (!text || typeof text !== "string") return text;

  // Handle text that might contain HTML tags
  return text.replace(/\b(\w{2,})\b/g, (word) => {
    const midPoint = Math.ceil(word.length / 2);
    const boldPart = word.slice(0, midPoint);
    const normalPart = word.slice(midPoint);
    return `<span class="bionic-bold">${boldPart}</span>${normalPart}`;
  });
};

// Function to extract text content from React children
const extractTextContent = (children) => {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join("");
  }
  if (React.isValidElement(children)) {
    return extractTextContent(children.props.children);
  }
  return "";
};

// Custom ReactMarkdown components with bionic reading
const bionicMarkdownComponents = {
  p: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <p
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  li: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <li
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  // Keep structural elements normal but apply bionic to text content
  h1: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <h1
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  h2: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <h2
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  h3: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <h3
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  h4: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <h4
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  h5: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <h5
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  h6: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <h6
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  strong: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <strong
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  em: ({ children }) => {
    const textContent = extractTextContent(children);
    return (
      <em
        dangerouslySetInnerHTML={{
          __html: createBionicText(textContent),
        }}
      />
    );
  },
  code: ({ children }) => <code>{children}</code>,
  pre: ({ children }) => <pre>{children}</pre>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Generate session ID on component mount
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setSessionId(newSessionId);
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setError("");

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/chat", {
        message: userMessage,
        session_id: sessionId,
      });

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to send message. Please check if the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    try {
      await axios.delete(`http://localhost:5001/chat/clear/${sessionId}`);
      setMessages([]);
      setError("");
    } catch (error) {
      console.error("Clear chat error:", error);
      setError("Failed to clear chat history.");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Chat Assistant</h2>
        <button
          className="clear-button"
          onClick={clearChat}
          disabled={messages.length === 0}>
          Clear Chat
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>👋 Hello! I'm your AI assistant. How can I help you today?</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user" ? "user-message" : "ai-message"
            }`}>
            <div className="message-content">
              <div className="message-text">
                {message.sender === "ai" ? (
                  <ReactMarkdown components={bionicMarkdownComponents}>
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: createBionicText(message.text),
                    }}
                  />
                )}
              </div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message ai-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send)"
            disabled={isLoading}
            rows="1"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button">
            {isLoading ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
