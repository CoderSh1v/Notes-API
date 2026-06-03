import React, { useState } from 'react'
import styles from "../styles/Home.module.css"
import NewNote from '../components/NewNote'
import {Link} from "react-router-dom"

function Home() {
const [noteVisibility, setNoteVisibility] = useState(false)

  return (
    <div>
      <h1 >Welcome</h1>
      <div>

        <button className={styles.add} onClick={()=> setNoteVisibility(!noteVisibility)}>
          +
        </button>
        <Link to= "/register">  Register</Link>
        <Link to= "/login">  Login</Link>
        {noteVisibility && <NewNote />}
      </div>
    </div>
  )
}

export default Home