// Utilities of dependencies
import { io } from "socket.io-client";

// React utilities
import "../styles/Chat.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const url = (window.location.hostname == "localhost")
	? "http://localhost:8001/api/auth/"
	: "https://socketchat-node-production.up.railway.app/api/auth/";

function Chat() {

	let socket = useRef(null);
	let messageRef = useRef();
	const token = localStorage.getItem("token") || "";

	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [usersActive, setUsersActive] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {

		const validateToken = async () => {
			const response = await fetch(url, { headers: { Authorization: token } });

			const { user: userDB, token: tokenDB } = await response.json();
			localStorage.setItem("token", tokenDB);
			setUser(userDB);

			await connectSocket();
		};

		const connectSocket = async () => {
			socket.current = io({
				extraHeaders: { Authorization: localStorage.getItem("token") },
			});

			socket.current.on("connect", () => console.log("Sockets online"));

			socket.current.on("disconnect", () => {
				localStorage.clear();
				navigate("/");
				console.log("Sockets offline");
			});

			socket.current.on("receive-message", (messages) => setMessages(messages));
			socket.current.on("users-active", (usersActive) => setUsersActive(usersActive));
			socket.current.on("private-message", (message) => console.log(message));
		};

		const main = async () => await validateToken();
		main();
	}, [navigate, token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let message = messageRef.current.value;

		await socket.current.emit("send-message", { message })

		if (message.length === 0) return;
		messageRef.current.value = "";
	}

	return (
		<section id="chat-app">
			<header id="chat-header">
				<h1>Neochat App</h1>
				<hr />
			</header>
			<aside id="chat-users">
				<ul>
					{usersActive.length === 0 ? (
						<li>No active users</li>
					) : (
						usersActive.map(({ name, uid }) => (
							<li key={uid}>{name} is connected</li>
						))
					)}
				</ul>
				<hr />
			</aside>
			<main id="chat-box">
				<section className="box__header">
					{user && (
						<>
							<h3>{user.name}</h3>
							<span>{user.uid}</span>
						</>
					)}
					<hr />
				</section>
				<section className="box__message">
					<ul>
						{messages.length === 0 ? (
							<li>No messages</li>
						) : (
							messages.map(({ uid, name, message }, id) => {
								return (
									<li key={id}>
										<p>
											<span 
												style={
													uid !== user.uid 
														? { color: "#23abe1" }
														: { color: "#990332" }
												}>
													{name}: 
											</span>
											{message}
										</p>
									</li>
								);
							})
						)}
					</ul>
					<hr />
				</section>
				<section className="box__form">
					<form className="form__message" onSubmit={handleSubmit}>
						<input type="text" ref={messageRef} />
						<input type="submit" value="Send" />
					</form>
				</section>
			</main>
			<footer id="chat-footer"></footer>
		</section>
	);
}

export default Chat;
