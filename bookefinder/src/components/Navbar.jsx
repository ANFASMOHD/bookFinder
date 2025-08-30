import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-200 shadow p-3">
      <div className="flex justify-between items-center">
      
        <Link to="/" className="font-extrabold text-lg">
          BookApp
        </Link>

        <div className="hidden md:flex space-x-3">
          {user && (
            <>
              <Link className="font-bold mt-2" to="/">Search</Link>
              <Link className="font-bold mt-2" to="/favorites">Favorites</Link>
              <button
                onClick={logout}
                className="bg-red-700 p-2 rounded text-white"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link className="font-bold text-green-600" to="/login">
                Login
              </Link>
              <Link className="font-bold text-blue-600" to="/register">
                Register
              </Link>
            </>
          )}
        </div>

      {/* hambrgr */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* icon */}
          {isOpen ? (
            <span className="text-2xl">&#10005;</span> // X icon
          ) : (
            <span className="text-2xl">&#9776;</span> // Hamburger
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-3 md:hidden flex flex-col space-y-4 bg-gray-100 p-3 rounded">
          {user && (
            <>
              <Link className="font-bold " to="/" onClick={() => setIsOpen(false)}>Search</Link>
              <Link className="font-bold" to="/favorites" onClick={() => setIsOpen(false)}>Favorites</Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-red-700 p-2 rounded text-white"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link
                className="font-bold text-green-600"
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                className="font-bold text-blue-600"
                to="/register"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
