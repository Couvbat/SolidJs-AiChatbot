import { createSignal } from "solid-js";
import Cookies from "js-cookie";
import { TbKey, TbMessage, TbSettings } from "solid-icons/tb";

import ChatInput from "./components/ChatInput/ChatInput";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import ApiKeyPopup from "./components/ApiKeyPopup/ApiKeyPopup";

function App() {
  const [messages, setMessages] = createSignal([
    {
      role: "system",
      content:
        "You are a Senior Web Dev ChatBot. You've been using web development for 20 years, using technologies like SolidJs, React, ReactNative, Laravel, TailwindCSS, SQL, NoSQL, in Javascript and PHP mostly. Your task is to answer questions I may ask you about code and help me develop features. When asked for code, you MUST provide the WHOLE code in a code block without skipping any parts.",
    },
  ]);

  const [showApiKeyPopup, setShowApiKeyPopup] = createSignal(true);
  const [apiKeys, setApiKeys] = createSignal({
    // This is the state for the API keys
    openai: Cookies.get("openai_api_key") || "",
    mistral: Cookies.get("mistral_api key") || "",
  });

  // Callback function to be called from ApiKeyPopup
  const handleApiKeysUpdated = (openaiApiKey, mistralApiKey) => {
    setApiKeys({ openai: openaiApiKey, mistral: mistralApiKey });
    console.log("API keys:", openaiApiKey, mistralApiKey);
  };

  const [selectedApi, setSelectedApi] = createSignal();
  const [selectedModel, setSelectedModel] = createSignal();

  const getApiUrl = () => {
    return selectedApi() === "openai"
      ? "https://api.openai.com/v1/chat/completions"
      : "https://api.mistral.ai/v1/chat/completions";
  };
  // Make API request here
  const sendMessageToBot = async (newMessage) => {
    // Save the message to the state
    setMessages([...messages(), { role: "user", content: newMessage }]);

    // Create the request payload
    const requestPayload = {
      model: selectedModel(), // Use the selected model
      messages: messages(), // Append all messages to the request
      temperature: 0.7,
      top_p: 1,
      max_tokens: 4096,
      stream: false,
    };

    const apiKey =
      selectedApi() === "openai" ? apiKeys().openai : apiKeys().mistral;

    // Check if the API key is defined and not an empty string
    if (!apiKey || apiKey === "") {
      console.error(
        "API key is not set. Please set the API key before making a request."
      );
      return;
    }

    try {
      console.log("Sending message to the bot:", requestPayload);
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        // Handle the response from the AI model
        const responseData = await response.json();
        console.log("Response from the bot:", responseData);
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

  return (
    <div class="h-screen w-full relative flex overflow-hidden">
      {/* sidebar */}
      <aside class="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        {/* Api Keys */}
        <button type="button" onClick={() => setShowApiKeyPopup(true)}>
          <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
            <TbKey size={28} />
          </div>
        </button>

        {/* Chats */}
        <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
          <TbMessage size={28} />
        </div>

        {/* Settings */}
        <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
          <TbSettings size={28} />
        </div>
      </aside>

      <div class="w-full h-full flex flex-col justify-between">
        {/* header */}
        <header class="h-16 w-full flex items-center relative justify-start px-5 space-x-10 bg-gray-800">
          <div class="flex flex-shrink-0 items-center space-x-4 text-white">
            <div class="flex flex-row">
              <div class="text-center text-xl p-2">
                <label for="API" class="text-white">
                  Select API :{" "}
                </label>
                <select
                  name="API"
                  value={selectedApi()}
                  onChange={(e) => {
                    setSelectedApi(e.target.value);
                    setSelectedModel("");
                  }}
                  class="bg-gray-800 text-white"
                >
                  <option value="openai">OpenAI</option>
                  <option value="mistral">MistralAi</option>
                </select>
              </div>
             
                <div class="text-center text-xl p-2">
                  <label for="model" class="text-white">
                    Select Model :{" "}
                  </label>
                  <select
                    name="model"
                    value={selectedModel()}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    class="bg-gray-800 text-white"
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
                        <option value="mistral-large-latest">Mistral Large</option>
                      </>
                    )}
                  </select>
                </div>
          
            </div>
          </div>
        </header>

        {/* main */}
        <main class="max-w-full h-full flex flex-col relative overflow-y-hidden">
          <div class="h-full w-full flex flex-col justify-end overflow-y-scroll border border-white">
            {/* Api Key Popup */}
            <Show when={showApiKeyPopup()}>
              <ApiKeyPopup
                setShowApiKeyPopup={setShowApiKeyPopup}
                onApiKeyUpdate={handleApiKeysUpdated}
              />
            </Show>

            {/* Chat Messages */}
            <div class="overflow-y-auto max-h-[calc(100vh-16rem)]">
              {messages().map((message) => (
                <ChatMessage
                  key={`${message.role}-${message.content}`}
                  content={message.content}
                  role={message.role}
                />
              ))}
            </div>
          </div>
          {/* Chat Input */}
          <ChatInput
            onNewMessage={sendMessageToBot}
            selectedModel={selectedModel}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
