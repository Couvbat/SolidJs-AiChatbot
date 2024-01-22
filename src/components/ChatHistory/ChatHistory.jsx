import ChatMessage from "../ChatMessage/ChatMessage";

function ChatHistory({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage key={index} type={message.type} content={message.content} />
      ))}
    </div>
  );
}

export default ChatHistory;