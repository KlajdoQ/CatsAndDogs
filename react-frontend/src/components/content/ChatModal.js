import React, { useState, useEffect , useCallback} from "react";
import createChatChannel from "../javascript/channels/chat_channel";
import "./ChatModal.css";


const ChatModal = ({
  currentUser,
  author,
  handleClose,
  handleChatButtonClick,
  newMessage,
  setNewMessage,
  show
}) => {
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatChannel, setChatChannel] = useState(null);


  
  const handleReceivedMessage = useCallback((message) => {
    console.log("Received message:", message);
    if (message.receiver_id === currentUser.id) {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg.messageId === message.messageId
        );
  
        if (!messageExists) {
          const receivedMessage = {
            ...message,
            messageId: Date.now() + Math.random(),
          };
  
          handleChatButtonClick(author, true, false, receivedMessage);
          return [...prevMessages, receivedMessage];
        } else {
          return prevMessages;
        }
      });
    }
  }, [currentUser, author, handleChatButtonClick]);
  
    
    
    useEffect(() => {
      if (newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }, [newMessage]);
    
    useEffect(() => {
      if (currentUser?.id && author?.id) {
        const channel = createChatChannel(handleReceivedMessage, currentUser.id, author.id);
        setChatChannel(channel);
        if (newMessage) {
          channel.sendMessage(newMessage.content, currentUser?.id, author?.id);
        }
    
        // Return a cleanup function to unsubscribe when the component is unmounted
        return () => {
          channel.unsubscribe();
        };
      }
    }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = useCallback((event) => {
    if (inputValue.trim()) {
      const newSentMessage = {
        content: inputValue,
        user_id: currentUser?.id,
        messageId: Date.now() + Math.random(),
      };
      setMessages((prevMessages) => [...prevMessages, newSentMessage]);
  
      if (!chatChannel) {
        const channel = createChatChannel(handleReceivedMessage, currentUser.id);
        setChatChannel(channel);
        channel.sendMessage(inputValue, currentUser?.id, author?.id);
      } else {
        chatChannel.sendMessage(inputValue, currentUser?.id, author?.id);
      }
  
      setInputValue('');
      console.log('New message sent:', newSentMessage.content);
    }
  }, [inputValue, currentUser, chatChannel, handleReceivedMessage, author]);
  


  return (
    <>
    {show && (

      <section style={{ backgroundColor: "#eee" }} className="section">
        <div className="chatModal py-5">
          <div className="">
            <div className="">
              <div className="card">
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3"
                  style={{ borderTop: "4px solid #ffa900" }}
                >
                  <h5 className="mb-0">Chat </h5>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative", height: "300px" }}
                >
                  {/* <p>Message 1 </p> */}
                  {messages.map((message) => (
                    <div
                      key={message.messageId}
                      className={
                        message.user_id === currentUser.id
                          ? "currentUserMessage"
                          : "authorMessage"
                      }
                    >
                      <p> {message.content}</p>
                    </div>
                  ))}
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type message"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn btn-warning"
                      type="button"
                      style={{ paddingTop: ".55rem" }}
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}
    </>
  );
};

export default ChatModal;
