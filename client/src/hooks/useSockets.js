import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import url from "../utils/url";

const initialSetting = {
	theme: "dark",
	isActive: false,
}

export const useSockets = (socket) => {
  const token = window.localStorage.getItem("token") || "";
	
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
	const [chat, setChat] = useState({});
	const [setting, setSetting] = useState( 
		JSON.parse(window.localStorage.getItem("config")) || initialSetting
	);
	const [usersActive, setUsersActive] = useState([]);
	const [messages, setMessages] = useState([]);
	
	useEffect(() => {
		window.localStorage.setItem("config", JSON.stringify(setting))
	}, [setting])

	useEffect(() => {

		const validateToken = async () => {
			const response = await fetch(url + "auth/", { headers: { Authorization: token } });

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
	}, [navigate, token, socket]);

  return { 
    user, 
    setUser,
    chat, 
    setChat, 
    setting, 
    setSetting, 
    usersActive,
    messages,
  }
}