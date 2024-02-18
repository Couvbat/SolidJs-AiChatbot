/* This code snippet is a React component named `App` written in SolidJS. Here's a breakdown of what
the code is doing: */
// App.js
import { Show, createSignal } from "solid-js";
import Cookies from "js-cookie";

import ChatInput from "./components/ChatInput/ChatInput";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import ApiKeyPopup from "./components/ApiKeyPopup/ApiKeyPopup";

function App() {
  const [messages, setMessages] = createSignal([]);
  const [apiKeys, setApiKeys] = createSignal({
    openai: "",
    mistral: "",
  });

  const [selectedApi, setSelectedApi] = createSignal("mistral");
  const [selectedModel, setSelectedModel] = createSignal("mistral-tiny");

  // Load the API Keys from session storage on initialization
  const loadApiKeys = () => {
    const loadedKeys = {
      openai: Cookies.get("openai_api_key") || "",
      mistral: Cookies.get("mistral_api_key") || "",
    };
    setApiKeys(loadedKeys);
    console.log("Loaded API keys:", loadedKeys);
  };

  // Save the API Keys in cookies
  const saveApiKeys = (openaiKey, mistralKey) => {
    Cookies.set("openai_api_key", openaiKey, { expires: 30 }); // expires after 30 days
    Cookies.set("mistral_api_key", mistralKey, { expires: 30 }); // expires after 30 days
    setApiKeys({ openai: openaiKey, mistral: mistralKey });
    console.log("Saved API keys:", apiKeys());
  };

  // Make API request here
  const sendMessageToBot = async (newMessage) => {
    // Save the message to the state
    setMessages([...messages(), { role: "user", content: newMessage }]);

    // Create the request payload
    const requestPayload = {
      model: selectedModel(), // Use the selected model
      messages: messages(),
      temperature: 0.7,
      top_p: 1,
      max_tokens: 4096,
      stream: false,
    };

    try {
      console.log("Sending message to the bot:", requestPayload);
      const response = await fetch(
        // Use the selected API and model
        selectedApi() === "openai"
          ? "https://api.openai.com/v1/chat/completions"
          : "https://api.mistral.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              selectedApi() === "openai" ? apiKeys().openai : apiKeys().mistral // Use the selected API key
            }`,
          },
          body: JSON.stringify(requestPayload),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response from the bot:", responseData);
        // Handle the response from the AI (you may need to adapt this depending on response structure)
        const botReply = responseData.choices[0].message;
        setMessages([
          ...messages(),
          { role: botReply.role, content: botReply.content },
        ]);
      }
    } catch (error) {
      // Handle error
      console.error(
        "An error occurred while sending a message to the bot:",
        error
      );
    }
  };

  // Call loadApiKeys on initialization
  loadApiKeys();

  return (
    <div class="flex flex-col h-screen w-full z-0">
      <header>
        <h1 class="p-4 text-white text-center text-4xl font-bold">
          AI Chat UI
        </h1>
        <hr />

        <div class="text-center p-2">
          <label for="API" class="text-white">
            Select API:
          </label>
          <select
            name="API"
            value={selectedApi()}
            onChange={(e) => setSelectedApi(e.target.value)}
          >
            <option value="openai">OpenAI</option>
            <option value="mistral">MistralAi</option>
          </select>
        </div>

        <div class="text-center p-2">
          <label for="model" class="text-white">
            Select Model:
          </label>
          <select
            name="model"
            value={selectedModel()}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {selectedApi() === "openai" && (
              <>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
              </>
            )}
            {selectedApi() === "mistral" && (
              <>
                <option value="mistral-tiny">Mistral Tiny</option>
                <option value="mistral-small">Mistral Small</option>
                <option value="mistral-medium">Mistral Medium</option>
              </>
            )}
          </select>
        </div>
      </header>

      <Show when={!apiKeys().openai && !apiKeys().mistral}>
        <ApiKeyPopup onSaveKeys={saveApiKeys} />
      </Show>

      <div class="w-full md:w-9/12 lg:w-1/2 h-full mx-auto border rounded-xl mb-8 overflow-y-scroll overflow-hidden">
        /
        {messages().map((message) => (
          <ChatMessage
            key={`${message.role}-${message.content}`}
            content={message.content}
            role={message.role}
          />
        ))}
      </div>
      <ChatInput onNewMessage={sendMessageToBot} />
    </div>
  );
}

export default App;
