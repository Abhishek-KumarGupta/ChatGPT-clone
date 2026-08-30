import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v4 as uuidv4 } from "uuid";

function Sidebar() {
    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats
    } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await response.json();

            const filteredData = res.map((thread) => ({
                threadId: thread.threadId,
                title: thread.title
            }));

           // console.log("All Threads:", filteredData);

            setAllThreads(filteredData);
        } catch (err) {
            console.log("Error fetching threads:", err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv4());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        try {
            setCurrThreadId(newThreadId);
            setNewChat(false);
            setPrompt("");
            setReply(null);

            const response = await fetch(
                `http://localhost:8080/api/thread/${newThreadId}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await response.json();

            console.log("Selected Thread:", res);

            // Backend response ke according chats set karo
            setPrevChats(res);
            setNewChat(false);
        } catch (err) {
            console.log("Error changing thread:", err);
        }
    };

    return (
        <section className="sidebar">

            <button onClick={createNewChat}>
                <img
                    src="src/assets/blacklogo.png"
                    alt="gptlogo"
                    className="logo"
                />

                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

            <div className="history">
                {allThreads?.map((thread) => (
                    <li
                        key={thread.threadId}
                        onClick={() => changeThread(thread.threadId)}
                    >
                        {thread.title}
                    </li>
                ))}
            </div>

            <div className="sign">
                <p>By Abhishek Kumar &hearts;</p>
            </div>

        </section>
    );
}

export default Sidebar;