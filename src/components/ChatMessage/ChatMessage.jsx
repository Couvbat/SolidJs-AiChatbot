// ChatMessage.jsx
const ChatMessage = (props) => {
  const messageClass = `bg-slate-800 text-white whitespace-pre-wrap border rounded-md m-4 p-2 shadow-ms ${
    props.role === "user" ? "text-right" : "text-left"
  }`;
  return (
    <div class={messageClass}>
      <p>{props.content}</p>
    </div>
  );
};

export default ChatMessage;
