import { Show } from "solid-js";
import ChatMessage from "../ChatMessage/ChatMessage";

function ChatHistory({ messages }) {
  return (
    <Show when={messages}>
      <div>
        {messages.map((message, index) => (
          <ChatMessage key={index} type={message.type} content={message.content} />
        ))}
      </div>
    </Show>
  );
}

export default ChatHistory;