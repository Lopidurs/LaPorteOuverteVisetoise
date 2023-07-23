import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import ListGames from './Pages/ListGames/ListGames.js'
import Home from './Pages/Home/Home.js'
import DetailsGames from './Pages/DetailsGames/DetailsGames'
import ListUsers from './Pages/ListUsers/ListUsers'
import DetailsUsers from './Pages/DetailsUsers/DetailsUsers'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listGames" element={<ListGames />} />
                <Route path="/detailsGames" element={<DetailsGames />} />
                <Route path="/listUsers" element={<ListUsers />} />
                <Route path="/detailsUsers" element={<DetailsUsers />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
