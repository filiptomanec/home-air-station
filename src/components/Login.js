import {useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import "../styles/main.css";
import "../styles/form.css";
import "../styles/button.css";
import LoadingSpinner from "./LoadingSpinner";
import {useTranslation} from "react-i18next";


const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();

    const auth = useAuth();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input, setIsLoading);
            return;
        }
        setIsLoading(false);
        alert("Prosím vyplňte přihlašovací údaje");
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmitEvent} className="form">
                <div className="form_control">
                    <label htmlFor="username">{t("username")}:</label>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        aria-describedby="username"
                        aria-invalid="false"
                        onChange={handleInput}
                    />
                    <div id="username" className="sr-only">
                        Please enter a valid username.
                    </div>
                </div>
                <div className="form_control">
                    <label htmlFor="password">{t("password")}:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        aria-describedby="user-password"
                        aria-invalid="false"
                        onChange={handleInput}
                    />
                    <div id="user-password" className="sr-only">
                        your password should be more than 6 character
                    </div>
                </div>
                <button className="btnSubmit" disabled={isLoading}>
                    {isLoading ?
                        <LoadingSpinner/>
                        :
                        t("login")
                    }
                </button>
            </form>
        </div>
    );
};

export default Login;