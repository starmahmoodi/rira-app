import { useState } from "react"
import Form from "./components/Form"
import Notes from "./components/Notes"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

export type NoteType = {
  id: string;
  title: string;
  body: string;
  deadline: number;
}

export type MoveItemHandlerType = (dragIndex: number, hoverIndex: number) => void

export type AddNotesType = (note: NoteType) => void
export type DeleteNoteType = (id: string) => void
export type EditNoteType = (note: NoteType) => void

function App() {

  const [notes, setNotes] = useState<NoteType[]>([])

  const addNoteHandler: AddNotesType = (note) =>{
    setNotes(prevState => [...prevState, note])
  }

  const deleteNoteHandler: DeleteNoteType = (id) =>{
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const editNoteHandler: EditNoteType = (note) =>{
    const existingNoteInex = notes.findIndex(item => item.id === note.id)
    const newNotes = [...notes]
    newNotes[existingNoteInex] = note;
    setNotes(newNotes)

  }

  const moveItem: MoveItemHandlerType = (dragIndex, hoverIndex) => {
    const updatedItems = [...notes];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setNotes(updatedItems);
  };

  return (
    <>
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <Notes 
            notes={notes} 
            deleteNote={deleteNoteHandler} 
            editNote={editNoteHandler} 
            moveItemHandler={moveItem}
          />
        </DndProvider>
        <Form addNote={addNoteHandler} />
      </div>
      
    </>
  )
}

export default App
