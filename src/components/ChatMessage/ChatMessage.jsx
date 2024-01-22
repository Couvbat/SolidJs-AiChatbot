function ChatMessage({ type, content }) {
  return (
    <div className={type}>
      <span>{content}</span>
    </div>
  );
}

export default ChatMessage;