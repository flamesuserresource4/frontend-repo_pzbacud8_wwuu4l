import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-amber-900">Chi siamo</h2>
          <p className="mt-4 text-amber-800/90 leading-relaxed">
            Siamo un piccolo laboratorio artigianale nato dalla tradizione di famiglia. Ogni calzoncello è preparato a mano, seguendo ricette tramandate e ingredienti locali selezionati. Crediamo nella qualità, nella lentezza e nel valore delle cose fatte bene.
          </p>
          <p className="mt-4 text-amber-800/90 leading-relaxed">
            Dalla farina al ripieno, scegliamo produttori che condividono i nostri valori. Il risultato è un morso che profuma di casa.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
            alt="Impasto artigianale"
            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop"
            alt="Ingredienti freschi"
            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?q=80&w=1200&auto=format&fit=crop"
            alt="Frittura dorata"
            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow col-span-2"
          />
        </motion.div>
      </div>
    </section>
  );
}
