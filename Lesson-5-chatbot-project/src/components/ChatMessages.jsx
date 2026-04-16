import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

const ChatMessages = ({ chatMessages }) => {
  const chatMessageRef = useRef(null);

  // auto scroll feature.
  useEffect(() => {
    // console.log("Effect");
    const containerElement = chatMessageRef.current;
    // console.log(containerElement);

    if (containerElement) {
      // console.log(containerElement);
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      <div className="chat-message-container" ref={chatMessageRef}>
        {chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
              time={chatMessage.time}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChatMessages;
