import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Room from "./pages/Room";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import Table from "./pages/Table";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index path="/" element={<Room sensorId={1}/>}/>
                        <Route path="bedroom" element={<Room sensorId={2}/>}/>
                        <Route path="table" element={<Table/>}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
