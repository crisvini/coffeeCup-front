import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Error from './routes/Error.jsx'
import SignIn from './routes/SignIn.jsx'
import SignUp from './routes/SignUp.jsx'
import Home from './routes/Home.jsx'
import Discussion from './routes/Discussion.jsx'

import { UserTokenProvider } from './context/UserTokenContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
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
  <UserTokenProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </UserTokenProvider>
)
