import { useState } from "react";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import SearchBar from "../components/SearchBar";

const TABS = [
  { value: "tumu",     label: "Tümü" },
  { value: "okunacak", label: "Okunacak" },
  { value: "okunuyor", label: "Okunuyor" },
  { value: "okundu",   label: "Okundu" },
];

export default function HomePage({ books, onAdd, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("tumu");
  const [search, setSearch]       = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const q = search.toLowerCase().trim();
  const visible = books.filter((b) => {
    const matchTab    = activeTab === "tumu" || b.status === activeTab;
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const counts = {
    tumu:     books.length,
    okunacak: books.filter((b) => b.status === "okunacak").length,
    okunuyor: books.filter((b) => b.status === "okunuyor").length,
    okundu:   books.filter((b) => b.status === "okundu").length,
  };

  function openAdd()       { setEditingBook(null); setModalOpen(true); }
  function openEdit(book)  { setEditingBook(book); setModalOpen(true); }
  function closeModal()    { setModalOpen(false); setEditingBook(null); }

  function handleSave(data) {
    editingBook ? onEdit(editingBook.id, data) : onAdd(data);
    closeModal();
  }

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── Top bar ── */}
      <header className="bg-ink border-b-2 border-ink sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 logo-group cursor-pointer select-none">
            {/* Brutalist Comma Logo */}
            <div className="w-9 h-9 relative flex-shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Red square on top */}
                <rect 
                  x="25" 
                  y="10" 
                  width="48" 
                  height="48" 
                  fill="#FF3B30" 
                  stroke="#0D0D0D" 
                  strokeWidth="5.5" 
                  strokeLinejoin="miter" 
                  className="logo-square"
                />
                {/* Orange polygon on bottom */}
                <polygon 
                  points="45,64 73,64 48,92 20,92" 
                  fill="#FF7A00" 
                  stroke="#0D0D0D" 
                  strokeWidth="5.5" 
                  strokeLinejoin="miter" 
                  className="logo-polygon"
                />
              </svg>
            </div>
            <h1 className="text-white font-black text-2xl tracking-tight lowercase transition-colors duration-200 hover:text-accent-y">
              virgül
            </h1>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#FFE234] text-ink text-xs font-black uppercase tracking-widest border-2 border-[#FFE234] shadow-brutal-y hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Kitap Ekle
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Toplam",   count: counts.tumu,     bg: "bg-ink",         text: "text-[#FFE234]", labelText: "text-white/50" },
            { label: "Okunacak", count: counts.okunacak, bg: "bg-[#FFE234]",   text: "text-ink",       labelText: "text-ink/50" },
            { label: "Okunuyor", count: counts.okunuyor, bg: "bg-[#1A1AFF]",   text: "text-white",     labelText: "text-white/50" },
            { label: "Okundu",   count: counts.okundu,   bg: "bg-white",       text: "text-ink",       labelText: "text-ink/40" },
          ].map(({ label, count, bg, text, labelText }) => (
            <div key={label} className={`${bg} border-2 border-ink shadow-brutal px-4 py-4 flex flex-col items-center gap-1`}>
              <span className={`text-3xl font-black leading-none ${text}`}>{count}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${labelText}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Filters + Search ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          {/* Tabs */}
          <div className="flex border-2 border-ink overflow-hidden shadow-brutal">
            {TABS.map((tab, i) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-2 text-xs font-black uppercase tracking-widest transition-colors ${
                  i < TABS.length - 1 ? "border-r-2 border-ink" : ""
                } ${
                  activeTab === tab.value
                    ? "bg-ink text-[#FFE234]"
                    : "bg-white text-ink hover:bg-cream"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 font-mono text-[10px] ${activeTab === tab.value ? "text-[#FFE234]/60" : "text-ink/30"}`}>
                  {counts[tab.value]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* ── Divider label ── */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40">
            {visible.length} kitap
          </span>
          <div className="flex-1 h-[2px] bg-ink/10" />
        </div>

        {/* ── Card grid ── */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={() => openEdit(book)}
                onDelete={() => onDelete(book.id)}
              />
            ))}
          </div>
        ) : (
          <div className="border-2 border-ink border-dashed flex flex-col items-center justify-center py-20 gap-4 bg-white/40">
            <span className="text-5xl font-black text-ink/10 select-none">?</span>
            <p className="text-sm font-bold uppercase tracking-widest text-ink/40">
              {search ? "Sonuç bulunamadı." : "Bu kategoride kitap yok."}
            </p>
            {!search && (
              <button
                onClick={openAdd}
                className="mt-1 px-4 py-2 border-2 border-ink bg-[#FFE234] text-ink text-xs font-black uppercase tracking-widest shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
              >
                İlk kitabı ekle →
              </button>
            )}
          </div>
        )}
      </main>

      {modalOpen && (
        <BookModal book={editingBook} onSave={handleSave} onClose={closeModal} />
      )}
    </div>
  );
}
