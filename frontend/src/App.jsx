import { useState, useEffect, useRef } from 'react'
import Register from './components/Register'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>  <Register /></>
    },
    {
      path : "/register",
      element :<>  <Register /></>
    },
    {
      path : "/login",
      element :<>  <Login /></>
    }
  ]) 
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
