// components/ApiKeyPopup/ApiKeyPopup.jsx
import { Show, createSignal, createEffect } from "solid-js";
import Cookies from "js-cookie";

const ApiKeyPopup = (props) => {
  const [openaiKey, setOpenaiKey] = createSignal(Cookies.get("openai_api_key") || "");
  const [mistralKey, setMistralKey] = createSignal(Cookies.get("mistral_api_key") || "");

  const saveKeysAndClose = () => {
    // Save the API Keys in cookies
    e.preventDefault(); // Prevent form submission reloading page
    Cookies.set("openai_api_key", openaiKey(), { expires: 30 }); // expires after 30 days
    Cookies.set("mistral_api_key", mistralKey(), { expires: 30 }); // expires after 30 days    
    props.onApiKeyUpdate(openaiKey(), mistralKey());
    // No need for close function since the popup visibility should be managed within this component based on the presence of API keys
    props.setShowApiKeyPopup(false);
  };

  // Automatically check if keys exist and close the popup accordingly
  createEffect(() => {
    const openai = openaiKey();
    const mistral = mistralKey();
    if (openai && mistral) {
      console.log("API keys loaded, openai:", openai, "mistral:", mistral);
      props.onApiKeyUpdate(openai, mistral);
      props.setShowApiKeyPopup(false);
    }
  });

  return (
    <div class="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div class="mx-auto p-8 bg-slate-800 border">
        <h2 class="text-white text-center text-xl">Enter API Keys</h2>
        <form class="flex flex-col items-center" onSubmit={saveKeysAndClose}>
          <div class="p-4">
            <label class="text-white" for="openai_key">
              OpenAI API Key:{" "}
            </label>
            <input
              class="w-full"
              id="openai_key"
              type="text"
              value={openaiKey()}
              onInput={(e) => setOpenaiKey(e.target.value)}
            />
          </div>
          <div class="p-4">
            <label class="text-white" for="mistral_key">
              Mistral API Key:{" "}
            </label>
            <input
              class="w-full"
              id="mistral_key"
              type="text"
              value={mistralKey()}
              onInput={(e) => setMistralKey(e.target.value)}
            />
          </div>
          <button
            class="bg-black text-white border rounded-xl px-4 py-2"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyPopup;