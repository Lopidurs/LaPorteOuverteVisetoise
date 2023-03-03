
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import './App.css';

import Home from "./Pages/Home/Home.js"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
