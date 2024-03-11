// ChatInput.jsx
import { createSignal } from "solid-js";
import {TbSend} from 'solid-icons/tb';

const ChatInput = (props) => {
  const [message, setMessage] = createSignal("");

  const sendMessage = (event) => {
    event.preventDefault();
    if (message()) {
      props.onNewMessage(message());
      setMessage("");
    }
  };

  return (
    <form
      class="flex flex-row w-full md:w-10/12 lg:w-1/2 p-8 mx-auto self-center"
      onSubmit={sendMessage}
    >
      <textarea
        class="p-4 text-xl border rounded w-full resize-y max-h-64"
        value={message()}
        onInput={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        class="mx-4 my-auto p-4 text-white text-xl border rounded hover:text-black hover:bg-white"
        type="submit"
        disabled={!props.selectedModel() && message()}
      >
        <TbSend size={28} />
      </button>
    </form>
  );
};

export default ChatInput;
