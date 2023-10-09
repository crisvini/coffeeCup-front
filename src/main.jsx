import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Error from './routes/Error.jsx'
import SignIn from './routes/SignIn.jsx'
import SignUp from './routes/SignUp.jsx'
import Home from './routes/Home.jsx'
import Discussion from './routes/Discussion.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <SignIn />
//       },
//       {
//         path: "signup",
//         element: <SignUp />
//       },
//       {
//         // path: '',
//         element: <ProtectedRoutes />,
//         children: [
//           {
//             path: "home",
//             element: <Home />
//           },
//           {
//             path: "discussion/:id",
//             element: <Discussion />
//           }
//         ]
//       }
//     ]
//   }
// ])

const authVerification = () => {
  if (!sessionStorage.getItem('login_token')) return false
  return true
}

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
        element: authVerification() ? <Home /> : <Navigate to="/" />
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
