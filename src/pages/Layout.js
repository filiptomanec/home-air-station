import styles from '../styles/main.module.css';
import {Outlet, NavLink} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <h1>Domácí stanice</h1>
            <nav>
                <ul style={{display: "flex"}}>
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive && styles.active}>
                            Obývák
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bedroom" className={({isActive}) => isActive && styles.active}>
                            Ložnice
                        </NavLink>
                    </li>
                    <li style={{marginLeft: "auto"}}>
                        <NavLink to="/table" className={({isActive}) => isActive && styles.active}>
                            Tabulka
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
};

export default Layout;
