import {useEffect, useState } from 'react';
import {ChatInput} from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';
import { Chatbot } from 'supersimpledev';

const App = () => {
  // initially load the message from the localstorage as string state, and use || in case localstorage have no messages to load.
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  console.log(chatMessages.length);

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique Id': () => `Sure! → ${crypto.randomUUID()}`
    });
  }, [])

  // saving the messages in localstorage whenever "chatMessage" is updated. 
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  return (
    <>
      <div className='app-container'>
        {chatMessages.length === 0 ? (
          <p>
            Welcome to the chatbot project! Send a message using the text below
          </p>
        ) : (
          ''
        )}
        <ChatMessages chatMessages={chatMessages} />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        /> 
      </div>
    </>
  );
};







export default App;
