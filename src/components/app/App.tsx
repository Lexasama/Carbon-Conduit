import React from 'react';
import './App.css';
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Register from "../authetication/register";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../Home";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>

    );
}

export default App;
