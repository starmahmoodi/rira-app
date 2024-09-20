import Card from "./Card"
import { DeleteNoteType, EditNoteType, MoveItemHandlerType, NoteType } from "../App"

type NotesProps = {
    notes: NoteType[];
    deleteNote: DeleteNoteType;
    editNote: EditNoteType;
    moveItemHandler: MoveItemHandlerType;
}

const Notes = ({notes, deleteNote, editNote, moveItemHandler}: NotesProps) => {

  return (
    <div className="notes">
      {notes.map(((note, index) => (
          <Card
            index={index}
            note={note} 
            key={note.id}
            onDeleteNote={deleteNote} 
            onEditNote={editNote} 
            moveItem={moveItemHandler}
          />
      )))}
    </div>
  )
}

export default Notes