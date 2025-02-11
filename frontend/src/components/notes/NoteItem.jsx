import React from "react";
import { useNotes } from "../../hooks/NotesProvider";

const NoteItem = ({ note, updateNote }) => {
  const { deleteNote } = useNotes();
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note._id);
    }
  };

  return (
    <div className="transform transition-all duration-200 hover:scale-105">
      <div className="h-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {note.title}
          </h5>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {note.tag}
          </span>
        </div>
        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {note.content}
        </p>
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => updateNote(note)}
            className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
