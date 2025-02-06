import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

const NotesProvider = ({children}) => {
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    
    const getNotes = async(data) => {
        try{
            const response = await fetch("http://localhost:5000/api/auth/register",{
                method: "GET",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("site")}`,
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if(res){
                console.log(res);
                setNotes(res.data);
                return;
            }
            throw new Error(res.message);
        }catch(err){
            console.error(err);
        }
    };

    const addNote = async(title, content, tag) => {
        try{
            const response = await fetch('http://localhost:5000/api/notes/create-note',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("site")}`,
                },
                body: JSON.stringify({title, content, tag})
            });
            const res = await response.json();
            if(res){
                setNotes(res.data);
                return;
            }
            throw new Error(res.message);
        }catch(err){
            throw new Error(err.message);
        }
    }

    const editNote = async(id, title, content, tag) => {
        try{
            const response = await fetch(`http://localhost:5000/api/notes/update-note/${id}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("site")}`,
                },
                body: JSON.stringify({ title, content, tag})
            });
            const json = await response.json();
            
            let newNotes = JSON.parse(JSON.stringify(notes));
            if (newNotes && newNotes.length) {
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if (element._id === id) {
                        newNotes[index].title = title;
                        newNotes[index].content = content;
                        newNotes[index].tag = tag;
                        break;
                    }
                }
            } else {
                console.error('newNotes is not defined or is empty');
            }            
            setNotes(newNotes);
        }catch(err){
            throw new Error(err.message);
        }
    }

    const deleteNote = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/notes/delete-note/${id}`,{
                method: "DELETE",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("site")}`,
                }
            });
            const res = await response.json();
            if(res){
                const newNotes = notes.filter((note) => {return note._id !== id});
                setNotes(newNotes);
            }
        }catch(err){
            throw new Error(err.message);
        }
    }
    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
          {children}
        </NotesContext.Provider>
    )
};


export default NotesProvider;

export const useNotes = () => {
    return useContext(NotesContext);
};