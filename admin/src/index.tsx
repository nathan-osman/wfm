import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import App from './components/App'
import Home from './routes/Home'
import Login from './routes/Login'
import '@fontsource/montserrat'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
  ],
  {
    basename: '/admin',
  },
)

ReactDOM.createRoot(document.getElementById('root')!!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
