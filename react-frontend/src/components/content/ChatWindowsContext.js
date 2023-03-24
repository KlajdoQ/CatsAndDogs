// chatWindowsContext.js
import { createContext } from 'react';

const ChatWindowsContext = createContext({
  chatWindows: [],
  openChatWindow: () => {},
  closeChatWindow: () => {},
});

export default ChatWindowsContext;
