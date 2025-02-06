import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNotes } from "../../hooks/NotesProvider";

const AddNotes = () => {
  const context = useNotes();
  const { addNote } = context;
  const [note, setNotes] = useState({ title: "", content: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.content, note.content);
    setNotes({ title: "", content: "", tag: "" });
  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.value]: e.target.value });
  };

  return (
    <div>
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="title"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="content"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <input
            type="content"
            id="content"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={note.content}
            onChange={onChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="tag"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tag
          </label>
          <input
            type="tag"
            id="tag"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
