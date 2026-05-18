import { useEffect, useRef, useState } from "react";
import { GENRES, STATUSES, COVER_COLORS } from "../interfaces/Book";

const EMPTY_FORM = {
  title: "",
  author: "",
  genre: "Roman",
  status: "okunacak",
  coverColor: "#FFE234",
  notes: "",
};

const inputClass =
  "w-full px-3 py-2.5 border-2 border-ink bg-white text-sm font-medium text-ink placeholder-ink/30 focus:outline-none focus:shadow-brutal-sm transition-shadow font-sans";

const labelClass = "block text-xs font-bold uppercase tracking-widest text-ink mb-1.5";

export default function BookModal({ book, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  useEffect(() => {
    setForm(book
      ? { title: book.title, author: book.author, genre: book.genre, status: book.status, coverColor: book.coverColor || "#FFE234", notes: book.notes }
      : EMPTY_FORM
    );
    setErrors({});
    setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [book]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = "Kitap adı gereklidir.";
    if (!form.author.trim()) errs.author = "Yazar adı gereklidir.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/70" />

      {/* Panel */}
      <div className="relative bg-cream border-2 border-ink shadow-brutal-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header stripe */}
        <div className="bg-[#FFE234] border-b-2 border-ink px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-black uppercase tracking-widest text-ink">
            {book ? "// Kitabı Düzenle" : "// Yeni Kitap"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-ink bg-white text-ink hover:bg-ink hover:text-[#FFE234] transition-colors font-black"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">

          {/* Title */}
          <div>
            <label className={labelClass}>
              Kitap Adı <span className="text-[#E71D36]">*</span>
            </label>
            <input
              ref={firstInputRef}
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="örn. Suç ve Ceza"
              className={`${inputClass} ${errors.title ? "border-[#E71D36] shadow-[3px_3px_0px_#E71D36]" : ""}`}
            />
            {errors.title && (
              <p className="text-xs font-bold text-[#E71D36] uppercase tracking-wide mt-1">{errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className={labelClass}>
              Yazar <span className="text-[#E71D36]">*</span>
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              placeholder="örn. Fyodor Dostoyevski"
              className={`${inputClass} ${errors.author ? "border-[#E71D36] shadow-[3px_3px_0px_#E71D36]" : ""}`}
            />
            {errors.author && (
              <p className="text-xs font-bold text-[#E71D36] uppercase tracking-wide mt-1">{errors.author}</p>
            )}
          </div>

          {/* Genre + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tür</label>
              <select
                value={form.genre}
                onChange={(e) => set("genre", e.target.value)}
                className={inputClass}
              >
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Durum</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputClass}
              >
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Cover colour */}
          <div>
            <label className={labelClass}>Kapak Rengi</label>
            <div className="flex flex-wrap gap-2">
              {COVER_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set("coverColor", c.hex)}
                  title={c.id}
                  className={`w-8 h-8 border-2 transition-transform ${
                    form.coverColor === c.hex
                      ? "border-ink scale-110 shadow-brutal-sm"
                      : "border-ink/30 hover:border-ink hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Notlar</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Bu kitap hakkında düşüncelerinizi yazın..."
              rows={3}
              className={`${inputClass} resize-none font-mono text-[13px]`}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1 border-t-2 border-ink mt-1">
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-4 py-2 border-2 border-ink bg-white text-ink text-xs font-black uppercase tracking-widest shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              className="mt-4 px-5 py-2 border-2 border-ink bg-[#FFE234] text-ink text-xs font-black uppercase tracking-widest shadow-brutal-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              {book ? "Güncelle" : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
