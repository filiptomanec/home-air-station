import React from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import "../styles/main.css";
import "../styles/button.css";
import LanguageSelector from "../components/LanguageSelector";
import {useTranslation} from "react-i18next";

const PrivateRoute = () => {
    const auth = useAuth();
    const {t} = useTranslation();
    if (!auth.token) return <Navigate to="/login"/>;
    return (
        <>
            <div className="flexContainer">
                <div className="flexContainer" style={{justifyContent: "flex-start", flex: 1, marginLeft: "20px"}}>
                    <LanguageSelector/>
                </div>
                <h1 className="noWrap">{t("homeStation")}</h1>
                <div style={{flex: 1, display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>
                    <div style={{marginBottom: 20}}>
                        <h4 style={{margin: 10}}>{t("user")}: {auth.user}</h4>
                        <button onClick={() => auth.logOut()} className="btnSubmit btnSubmit-small">
                            {t("logout")}
                        </button>
                    </div>
                </div>
            </div>

            <nav>
                <ul style={{display: "flex"}}>
                    <li>
                        <NavLink to="/livingroom" className={({isActive}) => isActive && "active"}>
                            {t("livingRoom")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bedroom" className={({isActive}) => isActive && "active"}>
                            {t("bedRoom")}
                        </NavLink>
                    </li>
                    <li style={{marginLeft: "auto"}}>
                        <NavLink to="/table" className={({isActive}) => isActive && "active"}>
                            {t("table")}
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
};

export default PrivateRoute;