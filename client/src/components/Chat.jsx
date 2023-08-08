
// React utilities
import "../styles/Chat.css";
import { useRef } from "react";

// Components
// import Header from "./chat/Header";
import Menu from "./chat/Menu";
// import Box from "./chat/Box";
import Footer from "./chat/Footer";
import { AppContext } from "../hooks/useAppContext";
import Setting from "./chat/Setting";
import { useSockets } from "../hooks/useSockets";
import { Outlet } from "react-router-dom";

function Chat() {

	let socket = useRef(null);

	const {
		user,
		setUser,
		chat,
		setChat,
		setting,
		setSetting,
		usersActive,
		messages,
	} = useSockets(socket);

	let messageRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let message = messageRef.current.value;
		let time = new Date().toLocaleTimeString("en-US").slice(0, 4);
		if (message.length === 0) return;

		console.log(user);
		console.log(chat)

		await socket.current.emit("send-message", 
			{
				chat: { id: chat._id  },
				message,
				time
			}
		)
		
		messageRef.current.value = "";
	}

	return (
		<AppContext.Provider value={{ 
			user, 
			setUser,
			chat, 
			setChat,
			setting,
			setSetting
		}}>
			<section id="chat-app" className={setting.theme === "light" ? "chat-app__light" : "chat-app"} >
				{/* <Header socket={ socket.current } /> */}
				<Setting socket={ socket.current } />
				<Menu usersActive={ usersActive } />
				<Outlet
					context={
						{
							user, 
							messages, 
							messageRef, 
							handleSubmit, 
							socket: socket.current
						}
					}
				/>
				<Footer />
			</section>
		</AppContext.Provider>
	);
}

export default Chat;
