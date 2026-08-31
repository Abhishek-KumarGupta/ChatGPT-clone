import React, { useContext, useState, useEffect } from 'react';
import "./ChatWindow.css";
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import { ScaleLoader } from "react-spinners";

const ChatWindow = () => {

  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // reply change hone par chat me message add hoga
  useEffect(() => {

    if (reply) {
      setPrevChats(prevChats => [
        ...prevChats,
        {
          role: "assistant",
          content: reply
        }
      ]);
    }

  }, [reply, setPrevChats]);


  const getReply = async () => {

    if (!prompt.trim() || loading) return;

    // Current prompt ko save kar rahe hain
    const currentPrompt = prompt;

    // User message pehle chat me add karo
    setPrevChats(prevChats => [
      ...prevChats,
      {
        role: "user",
        content: currentPrompt
      }
    ]);

    setPrompt("");
    setLoading(true);
    setNewChat(false)

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: currentPrompt,
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

        // reply change hoga
        // useEffect automatically chalega
        setReply(data.reply);

      } else if (response.status === 429) {

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

  const handleProfileClick=() =>{
    setIsOpen(!isOpen)
  }


  return (
    <div className="chatwindow">

      <div className="navbar">

        <span>
          ChatGPT
          <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>

          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>

        </div>


      </div>
      {
        isOpen &&
        <div className="dropDown">
          <div className='dropDownItem'><i class="fa-solid fa-gear"></i>Setting</div>
          <div className='dropDownItem'><i class="fa-solid fa-circle-arrow-up"></i>Upgrade plan </div>
          <div className='dropDownItem'><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</div>


        </div>
      }



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