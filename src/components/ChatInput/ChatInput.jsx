// ChatInput.jsx
import { createSignal } from 'solid-js';

const ChatInput = (props) => {
	const [message, setMessage] = createSignal('');

	const sendMessage = (event) => {
		event.preventDefault();
		if (message()) {
			props.onNewMessage(message());
			setMessage('');
		}
	};

	return (
		<form class="fixed bottom-0 w-full p-8 mx-0 border-t text-center" onSubmit={sendMessage}>
			<input class="p-4 border rounded-s-full w-1/2 resize-y" type="textarea" value={message()} onInput={(e) => setMessage(e.target.value)} />
			<button class="p-4 text-white border rounded-e-full hover:text-black hover:bg-white" type="submit">Send</button>
		</form>
	);
};

export default ChatInput;