const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	type: {
    type: String,
		default: "GENERAL_CHAT",
		required: true,
	},
	state: {
		type: Boolean,
		default: true,
	},
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
	},
  users: {
    type: Array,
    default: [],
  },
  messages: {
    type: Array,
    default: [],
  }
});

const ChatModel = model("Chat", chatSchema);

module.exports = ChatModel;
