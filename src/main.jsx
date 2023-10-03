import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Error from './routes/Error.jsx'
import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import Discussion from './routes/Discussion.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "discussion/:id",
        element: <Discussion />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
