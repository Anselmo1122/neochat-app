
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

  get lastTeenMessages() {
    this.messages = this.messages.splice(0, 100);
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