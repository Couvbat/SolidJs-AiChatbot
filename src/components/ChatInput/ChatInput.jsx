// ChatInput.jsx
import { createSignal } from "solid-js";

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
    <>
    <hr/>
    <form
      class="flex flex-row w-full md:w-9/12 lg:w-1/2 p-8 mx-auto text-center"
      onSubmit={sendMessage}
    >
      <input
        class="p-4 border rounded-s-full w-full resize-y"
        type="textarea"
        value={message()}
        onInput={(e) => setMessage(e.target.value)}
      />
      <button
        class="p-4 text-white border rounded-e-full hover:text-black hover:bg-white"
        type="submit"
      >
        Send
      </button>
    </form>
    </>
  );
};

export default ChatInput;
