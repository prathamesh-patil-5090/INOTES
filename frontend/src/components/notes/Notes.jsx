import React from 'react';
import { useAuth } from "../../hooks/AuthProvider";
import { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const url = "http://localhost:5000/api/notes/get-notes";
  const [data, setData] = useState([]);
  const [database, setDatabase] = useState([]);
  let user = localStorage.getItem('site') || null;
  const token = user.token;
  const fetchInfo = (err) => {
  return axios.get(url, { headers: { "Authorization":`Bearer ${user}`} })
          .then(res => {
            console.log(res); 
            setData(res.data);
          })
          .catch((err) => console.log(err));  
  }
  useEffect(() => {
      fetchInfo();
  }, []);
  // for(var i = 0; i < data.length; i++){

  return (
    <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div className="flex justify-end px-4 pt-4">
    <button
      id="dropdownButton"
      data-dropdown-toggle="dropdown"
      className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      type="button"
    >
      <span className="sr-only">Open dropdown</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 3"
      >
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    </button>
    {/* Dropdown menu */}
    <div
      id="dropdown"
      className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
    >
      <ul className="py-2" aria-labelledby="dropdownButton">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Edit
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Export Data
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div className="flex flex-col items-center pb-10">
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    { data.map((d) => d.title) }
    </h5>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      { data.map((d) => d.content) }
    </span>
    <div className="flex mt-4 md:mt-6">
      <a
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Edit
      </a>
      <a
        href="#"
        className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Delete
      </a>
    </div>
  </div>
</div>

    </div>
  )
}

export default Notes;