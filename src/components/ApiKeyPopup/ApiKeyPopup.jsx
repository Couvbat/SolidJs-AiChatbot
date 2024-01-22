import { createSignal } from "solid-js";

function ApiKeyPopup({ onKeyReceive }) {
  const [apiKey, setApiKey] = createSignal('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onKeyReceive(apiKey());
    // After taking the key clear the input box
    setApiKey('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
        value={apiKey()}
        onInput={e => setApiKey(e.target.value)}
        placeholder='Enter your API Key here'
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ApiKeyPopup;