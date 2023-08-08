const ChatModel = require("./chat.model");

class Message {

  constructor( uid, name, message, time ) {
    this.uid = uid;
    this.name = name;
    this.message = message;
    this.time = time;
  }

}

class ChatMessages {

  constructor() {
    this.messages = [];
    this.users = {};
  }

  async lastMessages( id ) {
    const chat = await ChatModel.findById(id);
    this.messages = chat.messages;
    return this.messages;
  }

  get usersArr() {
    return Object.values( this.users );
  }

  sendMessage( uid, name, message, time ) {
    this.messages.unshift(
      new Message(uid, name, message, time)
    )
  }

  connectUser( user ) {
    this.users[user.id] = user;
  }

  disconnectUser( id ) {
    delete this.users[id];
  }

}

module.exports = ChatMessages;