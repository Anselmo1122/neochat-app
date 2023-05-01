import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import Chat from './routes/chat.jsx'
import Login from './routes/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <h2>Error Page</h2>,
  },
  {
    path: "chat",
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
