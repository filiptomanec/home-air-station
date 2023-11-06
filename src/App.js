import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LivingRoom from "./pages/LivingRoom";
import BedRoom from "./pages/BedRoom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="/" element={<LivingRoom />} />
                    <Route path="bedroom" element={<BedRoom />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
