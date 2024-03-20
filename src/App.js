import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Room from "./pages/Room";
import NoPage from "./pages/NoPage";
import Table from "./pages/Table";
import AuthProvider from "./auth/AuthProvider";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import "./i18n";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route index path="/" element={<Welcome/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="livingroom" element={<Room sensorId={1}/>}/>
                            <Route path="bedroom" element={<Room sensorId={2}/>}/>
                            <Route path="table" element={<Table/>}/>
                        </Route>
                        <Route path="*" element={<NoPage/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
