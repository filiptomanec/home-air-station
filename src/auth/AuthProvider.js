import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();
    const loginAction = async (data, setIsLoading) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res) {
                setUser(res.username);
                setToken(res.access_token);
                localStorage.setItem("user", res.username);
                localStorage.setItem("token", res.access_token);
                setIsLoading(false);
                navigate("/livingroom");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            setIsLoading(false);
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{token, user, loginAction, logOut}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};