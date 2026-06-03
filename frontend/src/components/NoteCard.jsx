import React from 'react'
import styles from "../styles/Note.module.css"
const NoteCard = (props) => {
    
    const token= localStorage.getItem("token")
    const deleteNote = async (id) => {
        await fetch(`http://localhost:3000/notes/${id}`,{
            method : "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}`}
        })
    }
    return (
        <div className={styles.note} >
            <span>{props.title}</span>
            
            <button className={styles.delete} onClick={()=>deleteNote(props._id)}>Delete</button>
        </div>
    )
}

export default NoteCard
