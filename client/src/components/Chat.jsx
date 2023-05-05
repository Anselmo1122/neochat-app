// Utilities of dependencies
import { io } from "socket.io-client";

// React utilities
import "../styles/Chat.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Utils
import url from "../utils/url";

// Components
import Header from "./chat/Header";
import Aside from "./chat/Aside";
import Box from "./chat/Box";
import Footer from "./chat/Footer";

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
		let time = new Date().toLocaleTimeString("en-US").slice(0, 4);
		if (message.length === 0) return;

		await socket.current.emit("send-message", { message, time })
		
		messageRef.current.value = "";
	}

	return (
		<section id="chat-app">
			<Header socket={ socket.current } />
			<Aside 
				users={ usersActive } 
				user={ user } 
			/>
			<Box 
				user={ user }
				messages={ messages }
				message={ messageRef }
				handleSubmit={ handleSubmit }
			/>
			<Footer />
		</section>
	);
}

export default Chat;
