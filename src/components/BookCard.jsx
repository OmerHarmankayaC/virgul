import { useEffect, useRef, useState } from "react";
import StatusBadge from "./StatusBadge";
import { COVER_COLORS } from "../interfaces/Book";

function isDark(hex) {
  const c = COVER_COLORS.find((c) => c.hex === hex);
  return c ? c.dark : false;
}

export default function BookCard({ book, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const clampedRef = useRef(null);
  const fullRef    = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (clampedRef.current && fullRef.current) {
        setIsClamped(fullRef.current.clientHeight > clampedRef.current.clientHeight);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [book.notes]);

  const coverBg   = book.coverColor || "#FFE234";
  const dark      = isDark(coverBg);
  const textColor = dark ? "#FFFFFF" : "#0D0D0D";

  const formattedDate = new Date(book.dateAdded).toLocaleDateString("tr-TR", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <article className="bg-white border-2 border-ink shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col">

      {/* Cover band — user colour + subtle stripe texture */}
      <div
        className="border-b-2 border-ink px-4 pt-5 pb-4 flex items-end justify-between relative overflow-hidden"
        style={{ backgroundColor: coverBg }}
      >
        {/* diagonal stripe overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
        <StatusBadge status={book.status} />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-bold text-base leading-snug text-ink line-clamp-2" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-ink/60 font-medium mt-0.5 truncate" title={book.author}>
            {book.author}
          </p>
        </div>

        <span className="self-start text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border-2 border-ink bg-cream">
          {book.genre}
        </span>

        {book.notes && (
          <div className="flex-1 relative">
            {/* Visible (possibly clamped) paragraph */}
            <p
              ref={clampedRef}
              className={`text-sm text-ink/70 leading-relaxed font-mono text-[12px] ${notesExpanded ? "" : "line-clamp-2"}`}
            >
              {book.notes}
            </p>
            {/* Hidden clone without line-clamp — used only for height measurement */}
            <p
              ref={fullRef}
              className="text-sm text-ink/70 leading-relaxed font-mono text-[12px] invisible absolute top-0 left-0 w-full pointer-events-none"
              aria-hidden="true"
            >
              {book.notes}
            </p>
            {(isClamped || notesExpanded) && (
              <button
                onClick={() => setNotesExpanded((v) => !v)}
                className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
              >
                {notesExpanded ? "— gizle" : "devamını gör →"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t-2 border-ink px-4 py-3 flex items-center justify-between bg-cream/60">
        <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wide">
          {formattedDate}
        </span>

        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ink uppercase">Emin misin?</span>
            <button
              onClick={onDelete}
              className="text-xs font-bold px-2 py-1 bg-[#E71D36] text-white border-2 border-ink shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase"
            >
              Evet
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs font-bold px-2 py-1 bg-white text-ink border-2 border-ink shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase"
            >
              Hayır
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="text-xs font-bold px-2 py-1 bg-white text-ink border-2 border-ink shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-1 uppercase"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Düzenle
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs font-bold px-2 py-1 bg-[#E71D36] text-white border-2 border-ink shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-1 uppercase"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              Sil
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
