import React, { useState, useEffect } from 'react'
import styles from "../styles/Home.module.css"
import NewNote from '../components/NewNote'
import { Link } from "react-router-dom"
import NoteCard from '../components/NoteCard'

function Home() {
  const [noteVisibility, setNoteVisibility] = useState(false)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function fetchNotes() {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/notes", {
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
      })
      setNotes((await response.json()).data)
    }
    fetchNotes()
  }, [])


  return (
    <div>
      <h1 >Welcome</h1>
      <div>

        <button className={styles.add} onClick={() => setNoteVisibility(!noteVisibility)}>
          +
        </button>

        <Link to="/register">  Register</Link>
        <Link to="/login">  Login</Link>

        {noteVisibility && <NewNote />}

        <h3>Your Notes</h3>
        <div className={styles.notes} >
          {notes.map((note) => (
            <NoteCard key={note._id} _id={note._id} title={note.title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home