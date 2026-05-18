const CONFIG = {
  okunacak: { label: "Okunacak", classes: "bg-[#FFE234] text-ink" },
  okunuyor: { label: "Okunuyor", classes: "bg-[#1A1AFF] text-white" },
  okundu:   { label: "Okundu",   classes: "bg-[#0D0D0D] text-white" },
};

export default function StatusBadge({ status }) {
  const { label, classes } = CONFIG[status] ?? CONFIG.okunacak;
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border-2 border-ink ${classes}`}>
      {label}
    </span>
  );
}
