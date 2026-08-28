import React from 'react'
import "./ChatWindow.css"
import Chat from './Chat.jsx'

const ChatWindow = () => {
  return (
    <div className='chatwindow'>
      <div className='navbar'>
        <span>ChatGPT <i class="fa-solid fa-chevron-down"></i></span>
        <div className='userIconDiv'>
          <span className='userIcon'><i class="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat></Chat>
      <div className='chatInput'>
        <div className='inputBox'>
          <input placeholder='Ask anything'>
          </input>
          <div id='submit'>
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className='info'>
          ChatGPT can make mistakes. Check important info.
        </p>

      </div>
    </div>
  )
}

export default ChatWindow