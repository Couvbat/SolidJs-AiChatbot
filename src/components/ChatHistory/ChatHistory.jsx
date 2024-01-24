// ChatHistory.jsx
import ChatMessage from '../ChatMessage/ChatMessage';

const ChatHistory = (props) => {
	return (
		<div class="">
			{props.messages.map((message, index) => (
				<ChatMessage key={index} content={message.content} role={message.role} />
			))}
		</div>
	);
};

export default ChatHistory;