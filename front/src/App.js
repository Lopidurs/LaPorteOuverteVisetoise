import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import './App.css'

import ListGames from './Pages/ListGames/ListGames.js'
import Home from './Pages/Home/Home.js'
import DetailsGames from './Pages/DetailsGames/DetailsGames'
import ListUsers from './Pages/ListUsers/ListUsers'
import DetailsUsers from './Pages/DetailsUsers/DetailsUsers'
import Rental from './Pages/Rental/Rental'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login/Login'

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#2f2e2e'
            }
        }
    })

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Header user={user} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        {user && user.isStaff ? (
                            <>
                                <Route path="/listGames" element={<ListGames />} />
                                <Route path="/detailsGames" element={<DetailsGames />} />
                                <Route path="/detailsGames/:id" element={<DetailsGames />} />
                                <Route path="/listUsers" element={<ListUsers />} />
                                <Route path="/detailsUsers/:id" element={<DetailsUsers />} />
                                <Route path="/detailsUsers" element={<DetailsUsers />} />
                                <Route path="/rental/:id" element={<Rental />} />
                            </>
                        ) : null}
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default App
