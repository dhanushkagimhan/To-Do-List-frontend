import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateTask />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
