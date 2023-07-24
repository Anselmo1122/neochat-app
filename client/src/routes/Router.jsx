import { createBrowserRouter } from "react-router-dom"

// Components
import Chat from "../components/Chat"
import Login from "../components/Login"
import ErrorPage from "../components/ErrorPage"

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "chat",
    element: <Chat />
  }
])