// App.js
import { Show, createSignal } from 'solid-js';

import ChatInput from './components/ChatInput/ChatInput';
import ChatMessage from './components/ChatMessage/ChatMessage';
import ApiKeyPopup from './components/ApiKeyPopup/ApiKeyPopup';

function App() {
    const [messages, setMessages] = createSignal([]);
    const [apiKeys, setApiKeys] = createSignal({
        openai: '',
        mistral: ''
    });

    // Load the API Keys from session storage on initialization
    const loadApiKeys = () => {
        const loadedKeys = {
            openai: sessionStorage.getItem('openai_api_key') || '',
            mistral: sessionStorage.getItem('mistral_api_key') || ''
        };
        setApiKeys(loadedKeys);
        console.log('Loaded API keys:', loadedKeys);
    };

    // Save the API Keys to session storage
    const saveApiKeys = (openaiKey, mistralKey) => {
        sessionStorage.setItem('openai_api_key', openaiKey);
        sessionStorage.setItem('mistral_api_key', mistralKey);
        setApiKeys({ openai: openaiKey, mistral: mistralKey });
        console.log('Saved API keys:', apiKeys());
    };

    // Make API request here
    const sendMessageToBot = async (newMessage) => {

        // Save the message to the state
        setMessages([...messages(), { role: 'user', content: newMessage }]);

        // Create the request payload
        const requestPayload = {
            // "model": "gpt-3.5-turbo", //use this for OpenAI
            "model": "mistral-tiny", //use this for MistralAi
            "messages": messages(),
            "temperature": 0.7,
            "top_p": 1,
            "max_tokens": 2048,
            "stream": false,
        };

        try {
            console.log('Sending message to the bot:', requestPayload)
            // const response = await fetch('https://api.openai.com/v1/chat/completions', { //use this for OpenAI
            const response = await fetch('https://api.mistral.ai/v1/chat/completions', { //use this for MistralAi
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', //(usually default for fetch)
                    // 'Authorization': `Bearer ${apiKeys().openai}`, // Use OpenAi API key from state
                    'Authorization': `Bearer ${apiKeys().mistral}`, // Use MistralAi API key from state
                },
                body: JSON.stringify(requestPayload)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Response from the bot:', responseData)
                // Handle the response from the AI (you may need to adapt this depending on response structure)
                const botReply = responseData.choices[0].message;
                setMessages([...messages(), { role: botReply.role, content: botReply.content }]);
            }
        } catch (error) {
            // Handle error
            console.error('An error occurred while sending a message to the bot:', error);
        }
    };

    const handleNewMessage = (newMessage) => {
        sendMessageToBot(newMessage);
    };

    // Call loadApiKeys on initialization
    loadApiKeys();

    return (
        <div class="flex flex-col h-screen z-0">

            <header class="p-4">
                <h1 class="text-white text-center text-4xl font-bold">AI Chat UI</h1>
            </header>

            <Show when={!apiKeys().openai && !apiKeys().mistral}>
                <ApiKeyPopup onSaveKeys={saveApiKeys}/>
            </Show>

            <div class="w-1/2 h-full mx-auto border rounded-xl mb-48 overflow-y-scroll overflow-hidden">
                {messages().map((message) => (
                    <ChatMessage key={`${message.role}-${message.content}`} content={message.content} role={message.role} />
                ))}
            </div>

            <ChatInput onNewMessage={handleNewMessage} />

        </div>
    );
}

export default App;