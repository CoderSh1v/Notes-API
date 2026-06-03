import React, { useState, useEffect } from 'react'
import styles from "../styles/Home.module.css"
import NewNote from '../components/NewNote'
import { Link } from "react-router-dom"
import NoteCard from '../components/NoteCard'

function Home() {
  const [noteVisibility, setNoteVisibility] = useState(false)
  const [notes, setNotes] = useState([])
  const [Cursor, setCursor] = useState('')
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchNotes() {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/notes`, {
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
      })
      const jsonResponse = await response.json()

      setNotes(jsonResponse.data)
      setCursor(jsonResponse.cursor)
    }
    fetchNotes()
  }, [])
  async function loadNotes() {
    
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/notes?cursor=${Cursor}`, {
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
      })
      const jsonResponse = await response.json()
      setNotes([...notes, ...jsonResponse.data])
      setCursor(jsonResponse.cursor)

  }
  const filteredNotes = notes.filter((note)=>{
   return note.title.toLowerCase().includes(search.toLowerCase()) 
   })
  
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <h1 >Welcome</h1>
      <div>

        <button className={styles.add} onClick={() => setNoteVisibility(!noteVisibility)}>
          New Note
        </button>

        <Link to="/register">  Register</Link>
        <Link to="/login">  Login</Link>
        {noteVisibility && <NewNote />}

        <h3>Your Notes</h3>
        <input type="text" placeholder='search...' value={search} onChange={ handleSearch } />
        <div className={styles.notes} >
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} _id={note._id} title={note.title} />
          ))}
          <footer>
            {Cursor!== null ?
              <button onClick={() => { loadNotes() }}>Load More</button> :
              "No more notes"
            }
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Home