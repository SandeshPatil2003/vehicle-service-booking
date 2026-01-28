import React, { useState } from "react";
// import { askAI } from "../services/hfApi";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { askAI } from "../services/aiApi";

const SupportChatbot = () => {
//   const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setReply("🤖 Thinking...");

    try {
      const res = await askAI(message);
      setReply(res || "No response");
    } catch (err) {
      if (err.response?.status === 503) {
        setReply("🤖 AI is busy. Please try again.");
      } else {
        setReply("❌ Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-button" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <Card className="chatbot-window">
          <Card.Header className="d-flex justify-content-between">
            <span>Support Bot</span>
            <span style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>✖</span>
          </Card.Header>

          <Card.Body>
            <div className="chatbot-reply">
              {reply || "Hi 👋 How can I help you?"}
            </div>

            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
            />

            <Button
              className="w-100 mt-2"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Send"}
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default SupportChatbot;
