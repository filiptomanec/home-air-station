import {useNavigate} from "react-router-dom";
import "../styles/main.css";
import "../styles/button.css";

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>Vítejte v aplikaci Home Air Station!</h1>
            <button onClick={() => navigate("/login")} className="btnSubmit" style={{width: "auto"}}>
                Přihlásit se
            </button>
        </div>
    );
};

export default Welcome;