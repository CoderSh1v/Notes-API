import React from 'react'
import styles from "../styles/Note.module.css"
const NoteCard = (props) => {
    
    return (
        <div className={styles.note} key={props._id}>
            <span>{props.title}</span>
            
            <button className={styles.delete}>Delete</button>
        </div>
    )
}

export default NoteCard
