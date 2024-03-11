// ChatMessage.jsx
import { Show } from "solid-js";
import { SolidMarkdown } from "solid-markdown";

const ChatMessage = (props) => {

  const messageClass = `text-white whitespace-pre-wrap border rounded-md m-4 p-2 shadow-ms ${
    props.role === "user" ? "bg-slate-500 self-end" : "bg-slate-800 self-start"
  }`;

  return (
    <>
      {/* <p class={messageClass}>{props.content}</p> */}
      <Show when={props.role !== "system"}>
        <SolidMarkdown class={messageClass} children={props.content}/>
      </Show>
    </>
  );
};

export default ChatMessage;
