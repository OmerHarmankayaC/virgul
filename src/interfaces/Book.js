/**
 * @typedef {Object} Book
 * @property {number} id - Date.now() timestamp
 * @property {string} title
 * @property {string} author
 * @property {"Roman"|"Bilim Kurgu"|"Tarih"|"Kişisel Gelişim"|"Felsefe"|"Biyografi"|"Psikoloji"|"Diğer"} genre
 * @property {"okunacak"|"okunuyor"|"okundu"} status
 * @property {string} notes
 * @property {string} dateAdded - ISO date string
 */

export const GENRES = [
  "Roman",
  "Tarih",
  "Kişisel Gelişim",
  "Felsefe",
  "Biyografi",
  "Psikoloji",
  "Diğer",
];

export const COVER_COLORS = [
  { id: "yellow",  hex: "#FFE234", dark: false },
  { id: "blue",    hex: "#1A1AFF", dark: true  },
  { id: "orange",  hex: "#FF9F1C", dark: false },
  { id: "teal",    hex: "#4ECDC4", dark: false },
  { id: "purple",  hex: "#C77DFF", dark: false },
  { id: "red",     hex: "#E71D36", dark: true  },
  { id: "green",   hex: "#2DC653", dark: false },
  { id: "pink",    hex: "#FF6B9D", dark: false },
  { id: "ink",     hex: "#0D0D0D", dark: true  },
  { id: "cream",   hex: "#F5F0E8", dark: false },
];

export const STATUSES = [
  { value: "okunacak", label: "Okunacak" },
  { value: "okunuyor", label: "Okunuyor" },
  { value: "okundu",   label: "Okundu" },
];

/** @type {Book[]} */
export const SEED_BOOKS = [
  // --- okundu ---
  {
    id: 1,
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    genre: "Roman",
    status: "okundu",
    coverColor: "#FF9F1C",
    notes: "İnanılmaz bir psikolojik derinliğe sahip klasik bir eser.",
    dateAdded: "2024-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Atomik Alışkanlıklar",
    author: "James Clear",
    genre: "Kişisel Gelişim",
    status: "okundu",
    coverColor: "#2DC653",
    notes: "Küçük değişikliklerin büyük sonuçlar doğurabileceğini çok güzel anlatıyor.",
    dateAdded: "2024-02-10T09:00:00.000Z",
  },
  {
    id: 3,
    title: "Homo Deus",
    author: "Yuval Noah Harari",
    genre: "Tarih",
    status: "okundu",
    coverColor: "#0D0D0D",
    notes: "Sapiens'in devamı niteliğinde, insanlığın geleceğine dair düşündürücü öngörüler.",
    dateAdded: "2024-02-28T14:00:00.000Z",
  },
  // --- okunuyor ---
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Tarih",
    status: "okunuyor",
    coverColor: "#4ECDC4",
    notes: "İnsanlık tarihine farklı bir bakış açısı sunuyor.",
    dateAdded: "2024-03-02T14:30:00.000Z",
  },
  {
    id: 5,
    title: "Varlık ve Hiçlik",
    author: "Jean-Paul Sartre",
    genre: "Felsefe",
    status: "okunuyor",
    coverColor: "#E71D36",
    notes: "Ağır ama her sayfası çok değerli. Yavaş yavaş ilerliyorum.",
    dateAdded: "2024-04-05T11:20:00.000Z",
  },
  {
    id: 6,
    title: "Bülbülü Öldürmek",
    author: "Harper Lee",
    genre: "Roman",
    status: "okunuyor",
    coverColor: "#FFE234",
    notes: "Güney Amerika'da ırkçılık ve adaleti konu alan derin bir roman.",
    dateAdded: "2024-04-18T16:45:00.000Z",
  },
  // --- okunacak ---
  {
    id: 7,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Roman",
    status: "okunacak",
    coverColor: "#C77DFF",
    notes: "Bilim kurgunun klasiklerinden biri, çok merak ediyorum.",
    dateAdded: "2024-04-20T09:15:00.000Z",
  },
  {
    id: 8,
    title: "Bilinçdışının Gücü",
    author: "Joseph Murphy",
    genre: "Psikoloji",
    status: "okunacak",
    coverColor: "#FF6B9D",
    notes: "Zihnin nasıl çalıştığını anlamak için önerilen bir kitap.",
    dateAdded: "2024-05-01T08:30:00.000Z",
  },
  {
    id: 9,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biyografi",
    status: "okunacak",
    coverColor: "#1A1AFF",
    notes: "Apple'ın kuruluş hikâyesini ve Jobs'ın dehasını merak ediyorum.",
    dateAdded: "2024-05-10T13:00:00.000Z",
  },
];
