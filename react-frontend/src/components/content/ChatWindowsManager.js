// ChatWindowsManager.js
import React, { useState, useCallback } from 'react';
import ChatModal from './ChatModal';
import ChatWindowsContext from './ChatWindowsContext';



const ChatWindowsManager = ({ children , user}) => {
  const [chatWindows, setChatWindows] = useState([]);

  const openChatWindow = useCallback((author) => {
    setChatWindows((prevChatWindows) => [...prevChatWindows, author]);
  }, []);

  const closeChatWindow = useCallback((authorId) => {
    setChatWindows((prevChatWindows) =>
      prevChatWindows.filter((author) => author.id !== authorId)
    );
  }, []);

  return (
    <ChatWindowsContext.Provider
      value={{ chatWindows, openChatWindow, closeChatWindow }}
    >
      {children}
      {chatWindows.map((author) => (
        <ChatModal
          key={author.id}
          currentUser={user} // Make sure you have access to the current user here
          author={author}
          handleClose={() => closeChatWindow(author.id)}
          openChatWindow={openChatWindow}
        />
      ))}
    </ChatWindowsContext.Provider>
  );
};

export default ChatWindowsManager;
