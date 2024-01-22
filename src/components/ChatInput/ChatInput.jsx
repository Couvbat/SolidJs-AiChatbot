import { createSignal } from 'solid-js';

function ChatInput({ onSubmit }) {
  const [inputValue, setInputValue] = createSignal('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue());
    setInputValue('');
  };

  return (
    <form onSubmit={handleMessageSubmit}>
      <input type="text" value={inputValue()} onInput={(e) => setInputValue(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;