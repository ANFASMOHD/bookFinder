import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function BookSearch() {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("Ram");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => res.json())
      .then((data) => setBooks(data.items || []));
  }, [query]);

  const addFav = (book) => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    const favKey = `favorites_${user.email}`;
    const favs = JSON.parse(localStorage.getItem(favKey) || "[]");

    if (!favs.find((b) => b.id === book.id)) {
      favs.push(book);
      localStorage.setItem(favKey, JSON.stringify(favs));
      toast.success("Added to Favorites!");
    } else {
      toast.info("Already in Favorites");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-3xl mx-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((b) => (
            <div
              key={b.id}
              className="bg-gray-700 rounded-2xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={b.volumeInfo.imageLinks?.thumbnail}
                alt={b.volumeInfo.title}
                className="mb-3 w-28 h-40 object-cover rounded-md shadow"
              />
              <h3 className="font-semibold text-lg text-center line-clamp-2">
                {b.volumeInfo.title}
              </h3>
              <p className="text-sm text-gray-400 text-center">
                {b.volumeInfo.authors?.join(", ")}
              </p>
              <button
                onClick={() => addFav(b)}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 rounded-lg transition-colors"
              >
                ⭐ Add to Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
