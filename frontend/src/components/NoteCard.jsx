import React from 'react'
import styles from "../styles/Note.module.css"
import { useNavigate } from 'react-router-dom'

const NoteCard = (props) => {
    const navigate = useNavigate();
    const token= localStorage.getItem("token")
    const deleteNote = async (id) => {
        await fetch(`http://localhost:3000/notes/${id}`,{
            method : "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}`}
        })
    }

    const openSingleNote = (id)=>{
        navigate(`/notes/${id}`)
    }
    return (
        <div className={styles.note} onClick={()=>{openSingleNote(props._id)}} >
            <span>{props.title}</span>
            
            <button className={styles.delete} onClick={(e)=>{ e.stopPropagation() ;deleteNote(props._id)}}>Delete</button>
        </div>
    )
}

export default NoteCard
