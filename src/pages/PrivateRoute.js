import React from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import "../styles/main.css";
import "../styles/button.css";

const PrivateRoute = () => {
    const auth = useAuth();
    if (!auth.token) return <Navigate to="/login"/>;
    return (
        <>
            <div className="flexContainer">
                <div style={{flex: 1}}/>
                <h1 className="noWrap">Domácí stanice</h1>
                <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                    <div style={{marginBottom: 20}}>
                        <h4 style={{margin: 10}}>Uživatel: {auth.user}</h4>
                        <button onClick={() => auth.logOut()} className="btnSubmit btnSubmit-small">
                            Odhlásit
                        </button>
                    </div>
                </div>
            </div>

            <nav>
                <ul style={{display: "flex"}}>
                    <li>
                        <NavLink to="/livingroom" className={({isActive}) => isActive && "active"}>
                            Obývák
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bedroom" className={({isActive}) => isActive && "active"}>
                            Ložnice
                        </NavLink>
                    </li>
                    <li style={{marginLeft: "auto"}}>
                        <NavLink to="/table" className={({isActive}) => isActive && "active"}>
                            Tabulka
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
};

export default PrivateRoute;