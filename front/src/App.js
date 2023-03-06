import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import ListGames from './Pages/ListGames/ListGames.js'
import Home from './Pages/Home/Home.js'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listGames" element={<ListGames />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
