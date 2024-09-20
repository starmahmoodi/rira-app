import {  FormEvent, useState } from "react"
import { AddNotesType } from "../App"

type FormProps = {
    addNote: AddNotesType;
}


const Form = ({addNote}: FormProps) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [deadline, setDeadline] = useState('')


    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const id = Math.trunc(Math.random() * 100).toString()

        if (title && body && deadline) {
            addNote({
                id,
                title,
                body,
                deadline: parseInt(deadline)
            })

            setTitle('')
            setBody('')
            setDeadline('')
             
        }
        
    }

  return (
    <form onSubmit={submitHandler} className="form">
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create new note!</div>
        <div className="input-container ic1">
            <input className="input" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder=" "/>
            <div className="cut"></div>
            <label className="placeholder">Title</label>
        </div>
        <div className="input-container ic2">
            <textarea id="text-area" className="input" name="note" value={body} onChange={(e) => setBody(e.target.value)} placeholder=" "/>
            <div className="cut"></div>
            <label className="placeholder">Note</label>
        </div>
        <div className="input-container ic2">
            <input className="input" name="deadline" type='number' value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder=" "/>
            <div className="cut cut-long"></div>
            <label className="placeholder">Deadline(second)</label>
        </div>
        <button className="submit">add</button>
    </form>
  )
}

export default Form