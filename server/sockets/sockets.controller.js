const { Socket } = require("socket.io");

const socketsController = ( socket = new Socket ) => {
  // send a message to the client
  socket.emit("hello from server", "hola desde el servidor");
  // receive a message from the client
  socket.on("hello from client", (greeting) => {
    console.log(greeting);
  })
}

module.exports = {
  socketsController,
}