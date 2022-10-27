import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites/Favorites";
import HomePage from "./pages/HomePage/HomePage";
import reportWebVitals from './reportWebVitals';
import SignUp from "./pages/SignUp/SignUp";
import Login from './pages/Login/Login';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();