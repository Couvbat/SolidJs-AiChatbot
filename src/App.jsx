// App.js
import { Show, createSignal } from 'solid-js';
import ChatHistory from './components/ChatHistory/ChatHistory';
import ChatInput from './components/ChatInput/ChatInput';
import ApiKeyPopup from './components/ApiKeyPopup/ApiKeyPopup';
import './App.css';

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
        setShowApiKeyPopup(false);
        console.log('Saved API keys:', apiKeys());
    };


    // Make API request here
    const sendMessageToBot = async (newMessage) => {

        // Save the message to the state
        setMessages([...messages(), { role: 'user', content: newMessage }]);

        //TODO : Make the model a variable so we can easily change between openai's and mistral's models

        // Create the request payload
        const requestPayload = {
            "model": "gpt-3.5-turbo", //use this for OpenAI
            // "model": "mistral-tiny", //use this for Mistral
            "messages": messages(),
            "temperature": 0.7,
            "top_p": 1,
            "max_tokens": 2048,
            "stream": false,
            // "safe_prompt": false,
            // "random_seed": null
        };

        try {
            //TODO: Make the API URL and ApiKey a variable so we can easily change between openai and mistral

            console.log('Sending message to the bot:', requestPayload)
            const response = await fetch('https://api.openai.com/v1/chat/completions', { //use this for OpenAI
                method: 'POST',
                // const response = await fetch('https://api.mistral.ai/v1/chat/completions', { //use this for Mistral
                headers: {
                    'Content-Type': 'application/json', //(usually default for fetch)
                    'Authorization': `Bearer ${apiKeys().openai}`, // Use OpenAi API key from state
                    // 'Authorization': `Bearer ${apiKeys().mistral}`, // Use Mistral API key from state
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
        <div class="App">
            <header class="App-header">
                <h1>AI Chat UI</h1>
                {/* You will create your API Keys Popup and attach saveApiKeys function */}
            </header>
            <ChatHistory messages={messages()} />
            <ChatInput onNewMessage={handleNewMessage} />

            <Show when={!apiKeys().openai || !apiKeys().mistral}>
                <ApiKeyPopup onSaveKeys={saveApiKeys} onClose={() => setShowApiKeyPopup(false)} />
            </Show>
        </div>
    );
}

export default App;