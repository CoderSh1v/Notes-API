import { useState, useEffect, useRef } from 'react'
import Register from './pages/Register'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NoteDetails from './pages/NoteDetails'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>  <Home /></>
    },
    {
      path : "/register",
      element :<>  <Register /></>
    },
    {
      path : "/login",
      element :<>  <Login /></>
    },
    {
      path : "/notes/:id",
      element : <><NoteDetails /></>
    }
  ]) 
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
