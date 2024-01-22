import { createSignal } from "solid-js";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import ChatInput from "./components/ChatInput/ChatInput";
import ApiKeyPopup from "./components/ApiKeyPopup/ApiKeyPopup";

function App() {
  const [chatHistory, setChatHistory] = createSignal([]);
  const [apiKey, setApiKey] = createSignal('');

  const sendMessage = async (message) => {
    // append the message to the chat history
    setChatHistory([...chatHistory(), { author: 'user', text: message }]);

    // make the API call and wait for the response
    // for the sake of this example, we're using a placeholder
    const response = await fetch(`https://api.mistral.ai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${apiKey()}`
      },
      body: JSON.stringify({
        query: message
      })
    });
    const json = await response.json();

    // append the bot's response to the chat history
    setChatHistory([...chatHistory(), { author: 'bot', text: json.text }]);
  };

  const getUserKey = async (userEnteredKey) => {
    setApiKey(userEnteredKey);
  };

  return (
    <div>
      <ChatHistory chatHistory={chatHistory()} />
      <ChatInput onSend={sendMessage} />
      <ApiKeyPopup onKeyReceive={getUserKey} />
    </div>
  );
}

export default App;