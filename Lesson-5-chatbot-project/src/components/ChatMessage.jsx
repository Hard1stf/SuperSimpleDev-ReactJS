
import './ChatMessage.css'
import dayjs from 'dayjs';

export const ChatMessage = ({ message, sender, time }) => {
// console.log(`Chat Message: ${time}`);
  return (
    <div className={sender === 'bot' ? 'chat-message-bot' : 'chat-message-user'}>
      {sender === 'bot' && (
        <img src="https://supersimple.dev/projects/chatbot/robot.png" className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}
        {time && (<div className='chat-time'>{dayjs(time).format('h:mma')}</div>)}
      </div>
      {sender === 'user' && (
        <img src="https://supersimple.dev/images/profile-1.jpg" className="chat-message-profile" />
      )}
    </div>
  );
};