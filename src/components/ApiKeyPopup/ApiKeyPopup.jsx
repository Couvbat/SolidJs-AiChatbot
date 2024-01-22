import { createSignal } from 'solid-js';

function ApiKeyPopup({ onSubmit, onClose }) {
  const [apiKey, setApiKey] = createSignal('');

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    onSubmit(apiKey());
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleApiKeySubmit}>
        <label>
          API Key:
          <input type="text" value={apiKey()} onInput={(e) => setApiKey(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default ApiKeyPopup;