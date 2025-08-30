import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookSearch from "./pages/BookSearch";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";


import Navbar from "./components/Navbar";

export default function App() {


  return (
    <div>
 <Navbar/>

      <Routes>
        <Route path="/" element={<ProtectedRoute><BookSearch /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
       
    </div>
  );
}
