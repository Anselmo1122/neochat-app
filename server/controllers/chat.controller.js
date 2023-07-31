const { request, response } = require("express");

const ChatModel = require("../models/chat.model");

// Controlador para obtener los chats.
const chatsGet = async (req = request, res = response) => {
  const [chats, total] = await Promise.all([
    ChatModel.find(),
    ChatModel.countDocuments(),
  ])

  res.json({
    total,
    chats,
  })
}

// Controlador para obtener un chat.
const chatGet = async (req = request, res = response) => {
  const { id } = req.params;

	const chat = await ChatModel.findById(id)
    .populate("user", "name")

	res.json({
		chat
  })
}

// Controlador para crear chat.
const chatPost = async (req = request, res = response) => {
  const { name, type, users, messages } = req.body;
  
  const chat = new ChatModel({ 
    name,
    type,
    state: true,
    user: req.user._id,
    users,
    messages
  });

	// Guardar en BD
	await chat.save();

	res.json({
		message: `The chat ${name} created.`,
		chat,
	});
}

// Controlador para actualizar chat.
const chatPut = async (req = request, res = response) => {
  const { id } = req.params;
	const { name, type, messages } = req.body;

  const oldChat = await ChatModel.findById(id);

  const chat = await ChatModel.findByIdAndUpdate(id, {
    name: name,
    type: type || oldChat.type,
    user: req.user._id,
    messages: messages || oldChat.messages,
  })

	res.json({
		message: "Chat updated",
		chat,
	});
}

// Controlador para añadir mensaje al chat.
const chatPatch = async (req = request, res = response) => {
  const { id } = req.params;
	const { uid, name, message, time } = req.body;

  const newMessage = { uid, name, message, time };

  const oldChat = await ChatModel.findById(id);

  if (oldChat.messages.length > 200) {
    await oldChat.update({ messages: oldChat.messages.splice(0, 200) })
  }

  const chat = await ChatModel.findByIdAndUpdate(id, {
    messages: [...oldChat.messages, newMessage],
  })

	res.json({
		message: "Chat updated",
		chat,
	});
}

// Controlador para eliminar chat.
const chatDelete = async (req, res) => {
  const { id } = req.params;

	// Producto eliminado cambiando su "state" a "false"
	const chat = await ChatModel.findByIdAndUpdate(id, { state: false });

	const userAuthorized = req.user;

	res.json({
		chat,
		userAuthorized,
	});
}

module.exports = {
  chatPost,
  chatsGet,
  chatGet,
  chatPut,
  chatPatch,
  chatDelete
}