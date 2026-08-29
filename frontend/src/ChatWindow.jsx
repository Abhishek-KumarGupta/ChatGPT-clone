
import React, { useContext, useState } from 'react';
import "./ChatWindow.css";
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import { ScaleLoader } from "react-spinners";

const ChatWindow = () => {

  const {
    prompt,
    setPrompt,
    setReply,
    currThreadId
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);

  const getReply = async () => {

    // Empty message ya already running request ko stop karo
    if (!prompt.trim() || loading) return;

    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {

      const response = await fetch(
        "http://localhost:8080/api/chat",
        options
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        setReply(data.reply);
        setPrompt("");

      } else if (response.status === 429) {

        // Gemini quota/rate limit
        console.log("Rate Limit:", data);

      } else {

        console.log("Backend Error:", data);
      }

    } catch (err) {

      console.log("Error:", err);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="chatwindow">

      <div className="navbar">

        <span>
          ChatGPT
          <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div className="userIconDiv">

          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>

        </div>

      </div>

      <Chat />

      {loading && (
        <div className="loading">
          <ScaleLoader
            color="#8e8ea0"
            height={20}
            width={2}
            margin={1}
          />
        </div>
      )}

      <div className="chatInput">

        <div className="inputBox">

          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getReply();
              }
            }}
            disabled={loading}
          />

          <div
            id="submit"
            onClick={getReply}
            style={{
              pointerEvents: loading ? "none" : "auto",
              opacity: loading ? 0.5 : 1
            }}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </div>

        </div>

        <p className="info">
          ChatGPT can make mistakes. Check important info.
        </p>

      </div>

    </div>
  );
};

export default ChatWindow;

