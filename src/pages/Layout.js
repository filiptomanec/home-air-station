import styles from '../styles/main.module.css';
import {Outlet, NavLink} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <h1>Domácí stanice</h1>
            <nav>
                <ul>
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
                </ul>
            </nav>
            <Outlet/>
        </>
    );
};

export default Layout;
