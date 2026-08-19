# Virgül

A personal book tracker. Add a book, put it in one of three shelves — to read,
reading, read — and keep your notes on it.

The interface and the seeded book list are in Turkish.

## Features

- Three reading states: *okunacak*, *okunuyor*, *okundu*
- Add, edit and delete books; title, author, genre, notes
- Search and filter across the shelf
- A colour picked per book, used as its cover
- Everything persists in `localStorage` — no account, no backend

Storage is versioned (`LS_VERSION`): bumping it clears the old payload and
reloads the seed set, so a schema change can't leave a stale record behind.
Corrupted storage falls back to the seed instead of crashing.

## Stack

React 19 + Vite, Tailwind CSS.

```
src/
├── App.jsx                  state, persistence
├── pages/HomePage.jsx
├── components/              BookCard · BookModal · SearchBar · StatusBadge
└── interfaces/Book.js       shape, genres, statuses, cover colours, seed data
```

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run preview
```
