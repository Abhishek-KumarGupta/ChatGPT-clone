import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Chat = () => {
  const {
    newChat,
    prevChats,
    reply
  } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {

    // reply null ya empty hai
    if (!reply) {
      setLatestReply(null);
      return;
    }

    const content = reply.split(" ");

    let idx = 0;

    const interval = setInterval(() => {

      setLatestReply(
        content.slice(0, idx + 1).join(" ")
      );

      idx++;

      if (idx >= content.length) {
        clearInterval(interval);
      }

    }, 40);

    return () => clearInterval(interval);

  }, [reply]);


  return (
    <>
      {newChat && <h1>Start a new Message</h1>}

      <div className="chats">

        {prevChats?.map((chat, idx) => (

          <div
            key={idx}
            className={
              chat.role === "user"
                ? "userDiv"
                : "gptDiv"
            }
          >

            {chat.role === "user" ? (

              <p className="userMessage">
                {chat.content || ""}
              </p>

            ) : (

              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
              >
                {chat.content || ""}
              </ReactMarkdown>

            )}

          </div>

        ))}


        {latestReply !== null && (

          <div className="gptDiv" key="typing">

            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
            >
              {latestReply}
            </ReactMarkdown>

          </div>

        )}

      </div>
    </>
  );
};

export default Chat;