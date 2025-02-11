import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async(data) =>{
        try{
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if(res){
                setUser(res.name);
                console.log(res)
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }
            throw new Error(res.message);
        }catch(err){
            console.error(err);
        }
    };
    
    const registerAction = async(data) => {
        try{
            const response = await fetch("http://localhost:5000/api/auth/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if(res){
                setUser(res.name);
                console.log(res)
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }
            throw new Error(res.message);
        }catch(err){
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            setUser(null);
            setToken("");
            localStorage.removeItem("site");
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback cleanup
            localStorage.removeItem("site");
            window.location.href = "/";
        }
    };

    const value = {
        token,
        user,
        loginAction,
        logOut,
        registerAction
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};