import { useEffect, useRef, useState } from "react";
import { DeleteNoteType, EditNoteType, MoveItemHandlerType, NoteType } from "../App"
import { useDrag, useDrop } from "react-dnd";

type CardProps = {
  note: NoteType;
  index: number;
  onDeleteNote: DeleteNoteType;
  onEditNote: EditNoteType;
  moveItem: MoveItemHandlerType;
}

const Card = ({index, note, onDeleteNote, onEditNote, moveItem}: CardProps) => {
  const [edit, setEdit] = useState(false)

  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  const [deadline, setDeadline] = useState(note.deadline)

  const interval = useRef<number | null>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  
  const editHandler = () =>{
    if (edit) {
      onEditNote({
        id: note.id,
        title: title,
        body: body,
        deadline: note.deadline,
      })
      setEdit(false)
    }

    if (!edit) {
      setEdit(true)
    }
  }

  if (deadline <= 0 && interval.current !== null) {
    clearInterval(interval.current)
  }

  useEffect(() =>{

    interval.current = setInterval(() => {
      setDeadline(prev => prev -= 1)
    }, 1000)

    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current)
      }
      
    }
  }, [])

  
  const defaultClass = 'card'
  const opacity = isDragging ? ' isDraging' : '';
  const backgroundColor = isOver ? ' isOver' : '';
  const redCard = deadline === 0? ' red-card': '';

  const cardCssClass = defaultClass + opacity + backgroundColor + redCard

  return (
    <div id={note.id} className={cardCssClass} ref={(node) => drag(drop(node))}>
      <span className="dead-line">{deadline}</span>
      <h4 className={edit? 'editting' : ''}>{note.title}</h4>
      <p className={edit? 'editting' : ''}>{note.body}</p>
      <input className={edit? '' : 'editting'} name="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <input className={edit? '' : 'editting'} name="body" type="text" onChange={(e) => setBody(e.target.value)} value={body} />
      <button className="delete" onClick={() => onDeleteNote(note.id)}>Delete</button>
      <button className="edit" onClick={editHandler}>{edit? 'Save' : 'Edit'}</button>
    </div>
  )
}

export default Card