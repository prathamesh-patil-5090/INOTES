import React from "react";
import { useState } from "react";
import { useNotes } from "../../hooks/NotesProvider";

const AddNotes = () => {
  const { addNote, getNotes } = useNotes();
  const [note, setNotes] = useState({ title: "", content: "", tag: "" });
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addNote(note.title, note.content, note.tag);
      setNotes({ title: "", content: "", tag: "" });
      // Reload notes after successful creation
      await getNotes();
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Create New Note</h3>
      <form className="space-y-6" onSubmit={handleClick}>
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter title"
            required
            minLength={3}
            value={note.title}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter content"
            required
            minLength={5}
            value={note.content}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter tag (optional)"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Note'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
