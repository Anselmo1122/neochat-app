import './App.css'
import { io } from "socket.io-client";

const socket = io();
socket.emit("hello from client", "hola desde el cliente");
socket.on("hello from server", (greeting) => {
  console.log(greeting);
})

function App() {
  return (
    <>
      <h1>Neochat App</h1>
    </>
  )
}

export default App
