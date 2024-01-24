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
    <div class="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div class="mx-auto p-8 bg-slate-800 border">
        <h2 class="text-white text-center text-xl">Enter API Keys</h2>
        <form class="flex flex-col items-center" onSubmit={saveKeysAndClose}>
          <div class="p-4">
            <label class="text-white" for="openai_key">OpenAI API Key: </label>
            <input class="w-full" id="openai_key" type="text" value={openaiKey()} onInput={(e) => setOpenaiKey(e.target.value)} />
          </div>
          <div class="p-4">
            <label class="text-white" for="mistral_key">Mistral API Key: </label>
            <input class="w-full" id="mistral_key" type="text" value={mistralKey()} onInput={(e) => setMistralKey(e.target.value)} />
          </div>
          <button class="bg-black text-white border rounded-xl px-4 py-2" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyPopup;