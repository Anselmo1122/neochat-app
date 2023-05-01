// Utilities of dependencies
import { io } from "socket.io-client";

// React utilities
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {

    const url = (window.location.hostname == "localhost") 
      ? "http://localhost:8001/api/auth/"
      : "https://socketchat-node-production.up.railway.app/api/auth/"

    let socket = null;
    const token = localStorage.getItem("token") || "";

    const validateToken = async () => {

      const response = await fetch( url, {
        headers: { "Authorization": token}
      });
    
      const { user: userDB, token: tokenDB } = await response.json();
      localStorage.setItem("token", tokenDB);
      console.log(userDB)
    
      await connectSocket();
    }

    const connectSocket = async () => {

      socket = io({
        extraHeaders: { "Authorization": localStorage.getItem("token") }
      });
    
      socket.on('connect', () => {
        console.log("Sockets online");
      })
    
      socket.on('disconnect', () => {
        localStorage.clear();
        navigate("/");
        console.log("Sockets offline");
      })
    
      socket.on('receive-message', (message) => console.log(message));

      socket.on('users-active', (message) => console.log(message));
    
      socket.on('private-message', (message) => console.log(message));
    
    }

    const main = async () => {
      // Validar JWT
      await validateToken();
    }

    main();
  }, [navigate])

  return (
    <>
      <h2>Este es el chat</h2>
    </>
  )
}

export default Chat;
