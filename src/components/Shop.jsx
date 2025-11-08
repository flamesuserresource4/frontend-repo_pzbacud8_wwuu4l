import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS = [
  {
    id: "dolce-classico",
    name: "Calzoncelli Dolce Classico",
    desc: "Ripieno di ricotta, scorza d'arancia e miele locale.",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1543339308-43f2ba04c9b9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "salato-prosciutto",
    name: "Calzoncelli Salato al Prosciutto",
    desc: "Prosciutto, mozzarella filante e basilico fresco.",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "salato-verdure",
    name: "Calzoncelli Verdure di Stagione",
    desc: "Zucchine, peperoni arrostiti e provola affumicata.",
    price: 4.2,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "dolce-cioccolato",
    name: "Calzoncelli al Cioccolato",
    desc: "Crema al cacao fondente e granella di nocciole.",
    price: 3.8,
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Shop({ onGoToCheckout }) {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        product,
        qty: (prev[product.id]?.qty || 0) + 1,
      },
    }));
  };

  const increment = (id) =>
    setCart((c) => ({ ...c, [id]: { ...c[id], qty: c[id].qty + 1 } }));
  const decrement = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      const newQty = next[id].qty - 1;
      if (newQty <= 0) delete next[id];
      else next[id] = { ...next[id], qty: newQty };
      return next;
    });

  const items = Object.values(cart);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items]
  );

  return (
    <section id="products" className="relative bg-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-amber-900">
              I nostri prodotti
            </h2>
            <p className="mt-2 text-amber-800/80">
              Scegli tra dolci e salati, tutti preparati a mano.
            </p>
          </div>
          <button
            onClick={() => onGoToCheckout({ cart, subtotal })}
            disabled={items.length === 0}
            className="rounded-full bg-amber-700 disabled:opacity-50 text-amber-50 px-5 py-2.5 shadow hover:bg-amber-800"
          >
            Vai al checkout ({items.reduce((a, i) => a + i.qty, 0)})
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow ring-1 ring-amber-900/10 flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-amber-900">{p.name}</h3>
                <p className="mt-1 text-sm text-amber-800/80 flex-1">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-amber-900 font-semibold">€ {p.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-full bg-amber-700 text-amber-50 px-4 py-2 text-sm shadow hover:bg-amber-800"
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <CartPanel
          items={items}
          subtotal={subtotal}
          increment={increment}
          decrement={decrement}
        />
      </div>
    </section>
  );
}

function CartPanel({ items, subtotal, increment, decrement }) {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow ring-1 ring-amber-900/10 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-amber-900">Carrello</h3>
        <span className="text-amber-900 font-semibold">Totale: € {subtotal.toFixed(2)}</span>
      </div>
      <AnimatePresence initial={false}>
        {items.length === 0 ? (
          <p className="mt-4 text-amber-800/80">Il carrello è vuoto.</p>
        ) : (
          <ul className="mt-4 divide-y divide-amber-900/10">
            {items.map(({ product, qty }) => (
              <motion.li
                key={product.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt=""
                    className="w-12 h-12 rounded object-cover flex-none"
                  />
                  <div className="truncate">
                    <p className="text-amber-900 font-medium truncate">{product.name}</p>
                    <p className="text-sm text-amber-800/70">€ {product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(product.id)}
                    className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium text-amber-900">{qty}</span>
                  <button
                    onClick={() => increment(product.id)}
                    className="w-8 h-8 rounded-full bg-amber-700 text-amber-50 hover:bg-amber-800"
                  >
                    +
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
}
