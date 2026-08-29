
import './App.css'
import Sidebar from "./Sidebar.jsx"
import ChatWindow from "./ChatWindow.jsx"
import { MyContext } from './MyContext.jsx'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [currThreadId, setCurrThreadId] = useState(uuidv4());

  const providerValue = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValue}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App

