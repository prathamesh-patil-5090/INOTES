import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

const NotesProvider = ({children}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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
                setTitle(res.title);
                setContent(res.content);
                return;
            }
            throw new Error(res.message);
        }catch(err){
            console.error(err);
        }
    };
}

export default NotesProvider;

export const useNotes = () => {
    return useContext(NotesContext);
};