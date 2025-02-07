import React from "react";
import { useNotes } from "../../hooks/NotesProvider";
const NoteItem = (props) => {
  const context = useNotes();
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div>
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {note.content}
        </p>
        <button type="button" onClick={() => {
            updateNote(note);
          }} >Edit</button>
        <button type="button" onClick={() => {
            deleteNote(note._id);
          }} >Delete</button>
      </a>
    </div>
  );
};

export default NoteItem;
