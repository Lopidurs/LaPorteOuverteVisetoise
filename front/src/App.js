import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import ListGames from './Pages/ListGames/ListGames.js'
import Home from './Pages/Home/Home.js'
import DetailsGames from './Pages/DetailsGames/DetailsGames'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listGames" element={<ListGames />} />
                <Route path="/detailsGames" element={<DetailsGames />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
