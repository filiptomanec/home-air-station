import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <h1>Domácí stanice</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Obývák</Link>
                    </li>
                    <li>
                        <Link to="/bedroom">Ložnice</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;