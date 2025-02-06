import React, { useContext } from 'react';
import { useState, useEffect, useRef } from "react";
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';
import { useNotes } from '../../hooks/NotesProvider';


const Notes = () => {
  const context = useNotes();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
      getNotes();
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", econtent: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, econtent: currentNote.content, etag:currentNote.tag});
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.econtent, note.etag);
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({...note, [e.target.value]:e.target.value});
  }

  return (
    <>
        <AddNotes />
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="row my-3">
            <h2>You Notes</h2>
            {notes?.map((note) => {
                return <NoteItem key={note.id} updateNote={updateNote} note={note} />
            })}
        </div>
    </>
)
}

export default Notes;