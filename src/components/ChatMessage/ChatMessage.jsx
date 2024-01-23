// ChatMessage.jsx
import './ChatMessage.css';

const ChatMessage = (props) => {
  const messageClass = `ChatMessage ${props.role === 'user' ? 'user' : 'assistant'}`;
  return (
      <div class={messageClass}>
          <p>{props.content}</p>
      </div>
  );
};

export default ChatMessage;