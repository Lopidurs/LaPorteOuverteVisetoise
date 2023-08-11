import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'

import ListGames from './Pages/ListGames/ListGames.js'
import DetailsGames from './Pages/DetailsGames/DetailsGames'
import ListUsers from './Pages/ListUsers/ListUsers'
import DetailsUsers from './Pages/DetailsUsers/DetailsUsers'
import Rental from './Pages/Rental/Rental'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login/Login'
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy'

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
    }, [sessionStorage.getItem('user')])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Header user={user} />
                        <div style={{ flexGrow: 1 }}>
                            <Routes>
                                {user && user.isStaff ? (
                                    <>
                                        <Route path="/" element={<ListUsers />} />
                                        <Route path="/listGames" element={<ListGames />} />
                                        <Route path="/detailsGames" element={<DetailsGames />} />
                                        <Route
                                            path="/detailsGames/:id"
                                            element={<DetailsGames />}
                                        />
                                        <Route path="/listUsers" element={<ListUsers />} />
                                        <Route
                                            path="/detailsUsers/:id"
                                            element={<DetailsUsers />}
                                        />
                                        <Route path="/detailsUsers" element={<DetailsUsers />} />
                                        <Route path="/rental/:id" element={<Rental />} />
                                        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                                    </>
                                ) : (
                                    <>
                                        <Route path="/" element={<Login setUser={setUser} />} />
                                        <Route
                                            path="/login"
                                            element={<Login setUser={setUser} />}
                                        />
                                        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                                    </>
                                )}
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default App
