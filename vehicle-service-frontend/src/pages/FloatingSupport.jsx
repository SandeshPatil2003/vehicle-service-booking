import { useState } from "react";
import SupportChatbot from "./SupportChatbot";

const FloatingSupport = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="chatbot-container">
          <SupportChatbot />
        </div>
      )}

      {/* Floating Button */}
      <button
        className="chatbot-button"
        onClick={() => setOpen(!open)}
        title="Support"
      >
        💬
      </button>
    </>
  );
};

export default FloatingSupport;
