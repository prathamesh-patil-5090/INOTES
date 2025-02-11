import React from "react";
import { useState, useEffect, useRef } from "react";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";
import { useNotes } from "../../hooks/NotesProvider";

const Notes = () => {
  const context = useNotes();
  const { notes, getNotes, editNote , loading} = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    econtent: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      econtent: currentNote.content,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.econtent, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4">
      <AddNotes />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-6">
              <form className="space-y-4 my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="econtent"
                    name="econtent"
                    value={note.econtent}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer border-t border-gray-200 dark:border-gray-700 p-4">
              <button
                ref={refClose}
                type="button"
                className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-lg"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Notes</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <NoteItem key={note._id} updateNote={updateNote} note={note} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No notes found. Create one to get started!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
