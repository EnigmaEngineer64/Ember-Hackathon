import React from "react";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ChatPage.css";

const ChatPage = () => {
  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-page-content">
        <Chat />
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
