import {useNavigate} from "react-router-dom";
import "../styles/main.css";
import "../styles/button.css";
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import React from "react";

const Welcome = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div style={{display: "flex", alignItems: "flex-start"}}>
            <div style={{flex: 1}}/>
            <div className="container">
                <h1>{t("welcomeToTheHomeStationApp")}</h1>
                <button onClick={() => navigate("/login")} className="btnSubmit" style={{width: "auto"}}>
                    {t("login")}
                </button>
            </div>
            <div style={{display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "flex-start"}}>
                <LanguageSelector/>
            </div>
        </div>
    );
};

export default Welcome;