import { useEffect, useState } from "react";
import { SEED_BOOKS } from "./interfaces/Book";
import HomePage from "./pages/HomePage";

const LS_KEY = "kitap-listesi";
const LS_VERSION = "2"; // bump to reset localStorage and reload seed

const GENRE_REMAP = { "Bilim Kurgu": "Roman" };
const DEFAULT_COLORS = ["#FFE234", "#4ECDC4", "#C77DFF", "#FF9F1C", "#1A1AFF", "#2DC653", "#FF6B9D", "#E71D36"];

function loadBooks() {
  try {
    if (localStorage.getItem("kitap-listesi-v") !== LS_VERSION) {
      localStorage.removeItem(LS_KEY);
      localStorage.setItem("kitap-listesi-v", LS_VERSION);
      return SEED_BOOKS;
    }
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.map((b, i) => ({
        ...b,
        genre: GENRE_REMAP[b.genre] ?? b.genre,
        coverColor: b.coverColor ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      }));
    }
  } catch {
    // corrupted storage — fall through to seed
  }
  return SEED_BOOKS;
}

function saveBooks(books) {
  localStorage.setItem(LS_KEY, JSON.stringify(books));
}

export default function App() {
  const [books, setBooks] = useState(loadBooks);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  function addBook(data) {
    setBooks((prev) => [
      ...prev,
      { ...data, id: Date.now(), dateAdded: new Date().toISOString() },
    ]);
  }

  function editBook(id, data) {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  }

  function deleteBook(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <HomePage books={books} onAdd={addBook} onEdit={editBook} onDelete={deleteBook} />
  );
}
