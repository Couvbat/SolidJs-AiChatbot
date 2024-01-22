import { createSignal } from 'solid-js';
import ChatHistory from './components/ChatHistory/ChatHistory';
import ChatInput from './components/ChatInput/ChatInput';
import ApiKeyPopup from './components/ApiKeyPopup/ApiKeyPopup';

function App() {
  const [messages, setMessages] = createSignal([]);
  const [showApiKeyPopup, setApiKeyPopup] = createSignal(false);
  
  // Handle message submission from chat input
  const handleSubmit = async (message) => {
    setMessages([...messages(), { type: 'user', content: message }]);
    // Call your Laravel API endpoint here to get the API response
  };
  
  // Handle API Key submission
  const handleApiKeySubmit = (apiKey) => {
    // Store the API Key securely
    // You can use Web Storage API (localStorage/sessionStorage) or IndexedDB API based on your requirements
  };
  
  return (
    <>
      <button onClick={() => setApiKeyPopup(true)}>Set API Key</button>
      {showApiKeyPopup() && <ApiKeyPopup onSubmit={handleApiKeySubmit} onClose={() => setApiKeyPopup(false)} />}
      <ChatHistory messages={messages()} />
      <ChatInput onSubmit={handleSubmit} />
    </>
  );
}

export default App;