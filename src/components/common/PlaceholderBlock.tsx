export function PlaceholderBlock({ name, fullPage = false }: { name: string; fullPage?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center text-lg font-medium text-[#6f6559] ${
        fullPage ? "min-h-[60vh]" : "h-20 border-y border-[#b9ad9f]/40"
      }`}
    >
      {name}
    </div>
  );
}
