export default function Footer() {
  return (
    <footer className="bg-amber-100 border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-amber-900 font-semibold">Calzoncelli RaffSacc</p>
          <p className="text-sm text-amber-800/80">© {new Date().getFullYear()} Tutti i diritti riservati.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:info@raffsacc.it" className="text-amber-800 hover:text-amber-900 underline">info@raffsacc.it</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-amber-800 hover:text-amber-900">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-amber-800 hover:text-amber-900">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
