import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const url = "http://localhost:5000/api/auth/profile";
    const [data, setData] = useState([]);
    let user = localStorage.getItem('site') || null;
    console.log(user);
    const token = user.token;
    const fetchInfo = (err) => {
    return axios.get(url, { headers: { "Authorization":`Bearer ${user}`} })
            .then(res => {
              console.log(res.data);
              setData(res.data);
            })
            .catch((err) => console.log(err));  
    }
    useEffect(() => {
        fetchInfo();
    }, []);   
  return (
    <div className="container" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Profile Information:
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Name - {data.name}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Email - {data.email}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          ID - {data.id}
        </p>
      </a>
    </div>
  );
};

export default Profile;
