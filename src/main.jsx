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
import EmailVerification from './routes/EmailVerification.jsx'
import Profile from './routes/Profile.jsx'

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
        path: "signup/email-verification",
        element: <EmailVerification />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "discussion/:id",
        element: <Discussion />
      },
      {
        path: "profile/:id",
        element: <Profile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
