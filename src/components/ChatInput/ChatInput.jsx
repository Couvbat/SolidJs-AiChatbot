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
		<form class="" onSubmit={sendMessage}>
			<input type="text" value={message()} onInput={(e) => setMessage(e.target.value)} />
			<button type="submit">Send</button>
		</form>
	);
};

export default ChatInput;