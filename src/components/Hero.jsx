import { motion } from "framer-motion";

export default function Hero({ onScrollToProducts }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-orange-200/40 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-28 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">🍯 Artigianale • Fresco ogni giorno</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-amber-900">
            Calzoncelli RaffSacc
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-amber-800/90">
            Il gusto della tradizione in un morso. Dolci e salati preparati a mano con ingredienti selezionati e tanta passione.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onScrollToProducts}
              className="inline-flex items-center justify-center rounded-full bg-amber-700 text-amber-50 px-6 py-3 font-medium shadow hover:bg-amber-800 transition"
            >
              Scopri i calzoncelli
            </button>
            <a href="#about" className="text-amber-800 hover:text-amber-900 underline underline-offset-4">
              La nostra storia
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-amber-900/10">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop"
              alt="Calzoncelli artigianali su tagliere di legno"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
