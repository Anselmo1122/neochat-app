const { Socket } = require("socket.io");
const validateToken = require("../helpers/validateToken");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketsController = async (socket = new Socket(), io) => {
	const token = socket.handshake.headers.authorization;
	const user = await validateToken(token);

	if (!user) {
		socket.disconnect();
	}

	// Agregar al usuario conectado
	chatMessages.connectUser(user);
	io.emit("users-active", chatMessages.usersArr);
	socket.on("connect-chat", async ({ chat }) => {
		socket.emit("receive-message", await chatMessages.lastMessages(chat._id))
	});
	// socket.emit("receive-message", await chatMessages.lastMessages("64becb65db81dc6a27de16a5"));

	// Conectar a una sala especial
	socket.join(user.id);

	// Eliminar al usuario desconectado
	socket.on("disconnect", () => {
		chatMessages.disconnectUser(user.id);
		io.emit("users-active", chatMessages.usersArr);
	});

	// Envío de mensaje
	socket.on("send-message", async ({ chat, message, time, uid  }) => {
		if (uid) {
			// Mensaje privado
			socket.to(uid).emit("private-message", { of: user.name, message });
		} else {
			const res = await fetch("http://localhost:8001/api/" + "chat/" + chat.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Authorization": token
				},
				body: JSON.stringify({ uid: user.id, name: user.name, message, time }),
			});
			const data = await res.json();
			chatMessages.sendMessage(user.id, user.name, message, time);
			io.emit("receive-message", await chatMessages.lastMessages(chat.id));
		}
	});

	socket.on("disconnect-user", () => socket.disconnect())
};

module.exports = {
	socketsController,
};
