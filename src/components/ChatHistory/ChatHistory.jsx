// ChatHistory.jsx
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatHistory.css';

const ChatHistory = (props) => {
    return (
        <div class="ChatHistory">
            {props.messages.map((message, index) => (
                <ChatMessage key={index} content={message.content} role={message.role} />
            ))}
        </div>
    );
};

export default ChatHistory;