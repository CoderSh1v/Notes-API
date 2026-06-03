import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function NoteDetails() {
    const noteId = useParams()
    const [NoteTitle, setNoteTitle] = useState("")
    useEffect(() => {
        const fetchNote = async () => {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:3000/notes/${noteId.id}`, {
                headers: { 'Content-Type': "application/json", authorization: `Bearer ${token}` }
            })
            const data =await response.json()
            setNoteTitle( data.title)
        }
        fetchNote()
    }, [])
    function handleChange(e) {
        setNoteTitle(e.target.value);
    }
    async function updateNote() {
        const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:3000/notes/${noteId.id}`, {
                method : "PATCH",
                headers: { 'Content-Type': "application/json", authorization: `Bearer ${token}` },
                body : JSON.stringify({title : `${NoteTitle}`})
            })
    }
    return (
        <div>
            <input type="text" value={NoteTitle} onChange={handleChange}/>
            <input type="submit" value="Update" onClick={updateNote}/> 
            
        </div>
    )
}

export default NoteDetails
