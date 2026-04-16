import { useState } from "react";
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';
import dayjs from "dayjs";

export const ChatInput = ({ chatMessages, setChatMessages }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const saveInputText = (event) => {
    setInputText(event.target.value);
  };

  const sendMessage = async () => {
    if (isLoading || inputText === '') return;
    setIsLoading(true); // set loading to "true" from the starting the message.

    setInputText('');

    const newMessage = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: 'user',
        time: dayjs().valueOf()
      },
      {
        id: crypto.randomUUID(),
        message: (
          <img
            src="https://supersimple.dev/images/loading-spinner.gif"
            className="loading-spinner"
            alt="spinner-gif"
          />
        ),
        sender: 'bot',
        time: dayjs().valueOf()
      },
    ];

    setChatMessages(newMessage); // this will display "loading" part as well.

    const res = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newMessage.slice(0, newMessage.length - 1), // slice the "loading" part, now this only contains the userMessage part only.
      {
        id: crypto.randomUUID(),
        message: res,
        sender: 'bot',
        time: dayjs().valueOf() // Add this line to store the time for the bot message.
      },
    ]);
    setIsLoading(false); // set the loading to "false" after message done.
  };

  const keyDownInput = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      setInputText('');
    } else if (event.key === 'Escape') {
      setInputText('');
    } else {
      return;
    }
  };

  const clearChats = () => {
    setChatMessages([]); // this will clear the messages for the display and also from the localstorage.
  }

  return (
    <>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Sent a message to Chatbot"
          size="30"
          onChange={saveInputText}
          value={inputText}
          onKeyDown={keyDownInput}
          disabled={isLoading} // depends upon loading status (true or false).
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
        <button className="clear-btn" onClick={clearChats}>Clear</button>
      </div>
    </>
  );
};

