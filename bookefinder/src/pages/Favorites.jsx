import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (user) {
      const favKey = `favorites_${user.email}`;
      const stored = JSON.parse(localStorage.getItem(favKey) || "[]");
      setFavs(stored);
    }
  }, [user]);

  const removeFav = (id) => {
    if (!user) return;

    const favKey = `favorites_${user.email}`;
    const updated = favs.filter((b) => b.id !== id);
    setFavs(updated);
    localStorage.setItem(favKey, JSON.stringify(updated));
    toast.success("Removed from Favorites");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">
        My Favorites
      </h2>

      {!user && (
        <p className="text-center text-gray-300">
          Please login to view your favorites.
        </p>
      )}
      {user && favs.length === 0 && (
        <p className="text-center text-gray-300">No favorites yet.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favs.map((b) => (
          <div
            key={b.id}
            className="bg-gray-700 rounded-lg shadow-md p-3 transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
          >
            <img
              src={b.volumeInfo.imageLinks?.thumbnail}
              alt={b.volumeInfo.title}
              className="mb-2 rounded-md shadow h-32 object-contain"
            />
            <h3 className="font-semibold text-sm text-center mb-1 line-clamp-2">
              {b.volumeInfo.title}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-2 line-clamp-1">
              {b.volumeInfo.authors?.join(", ")}
            </p>
            <button
              onClick={() => removeFav(b.id)}
              className="mt-auto w-full bg-red-800 hover:bg-red-600 text-white text-xs font-medium py-1.5 rounded shadow"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <ToastContainer  position="top-center" autoClose={3000}/>
    </div>
  );
}
