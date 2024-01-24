// components/ApiKeyPopup/ApiKeyPopup.jsx
import { createSignal } from 'solid-js';

const ApiKeyPopup = (props) => {
  const [openaiKey, setOpenaiKey] = createSignal('');
  const [mistralKey, setMistralKey] = createSignal('');

  const saveKeysAndClose = () => {
    props.onSaveKeys(openaiKey(), mistralKey());
    props.onClose();
  };

  return (
    <div class="">
      <div class="">
        <h2>Enter API Keys</h2>
        <form onSubmit={saveKeysAndClose}>
          <label for="openai_key">OpenAI API Key:</label>
          <input id="openai_key" type="text" value={openaiKey()} onInput={(e) => setOpenaiKey(e.target.value)} />

          <label for="mistral_key">Mistral API Key:</label>
          <input id="mistral_key" type="text" value={mistralKey()} onInput={(e) => setMistralKey(e.target.value)} />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyPopup;