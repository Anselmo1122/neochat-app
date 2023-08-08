import { createBrowserRouter } from "react-router-dom"

// Components
import Home from "../components/Home"
import Login from "../components/Login"
import Index from "../components/Index"
import Chat from "../components/Chat"
import ErrorPage from "../components/ErrorPage"

// Loaders
import { loader as chatLoader } from "../loaders/chat-loader"
import Box from "../components/chat/Box"

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "chat",
    element: <Chat />,
    children: [
      {
        index: true, 
        element: <Index /> 
      },
      {
        path: ":chatId",
        element: 
        <Box />,
        loader: chatLoader,
      }
    ]
  }
])