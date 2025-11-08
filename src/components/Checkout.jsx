import { useEffect, useMemo, useState, useRef } from "react";

// Simple province to region mapping for Sardegna surcharge
const SARDINIA_PROVINCES = new Set([
  "CA", // Cagliari
  "NU", // Nuoro
  "OR", // Oristano
  "SS", // Sassari
  "SU", // Sud Sardegna
]);

export default function Checkout({ order, onBackToShop }) {
  const [form, setForm] = useState({
    phone: "",
    address: "",
    province: "",
    payment: "paypal",
  });
  const paypalRef = useRef(null);

  const surcharge = useMemo(() => (SARDINIA_PROVINCES.has(form.province.toUpperCase()) ? 7 : 0), [form.province]);
  const total = useMemo(() => (order?.subtotal || 0) + surcharge, [order, surcharge]);

  useEffect(() => {
    // Load PayPal script if not present
    const scriptId = "paypal-sdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=sb&currency=EUR`;
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }

    function renderButton() {
      if (!window.paypal || !paypalRef.current) return;
      // Clear previous buttons
      paypalRef.current.innerHTML = "";
      window.paypal.Buttons({
        style: { layout: "horizontal", color: "gold", shape: "rect", label: "paypal" },
        createOrder: (_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Calzoncelli RaffSacc - Ordine online",
                amount: {
                  currency_code: "EUR",
                  value: total.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (_, actions) => {
          await actions.order.capture();
          alert("Pagamento completato! Grazie per aver scelto Calzoncelli RaffSacc.");
        },
      }).render(paypalRef.current);
    }
  }, [total]);

  if (!order) return null;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const items = Object.values(order.cart || {});

  return (
    <section className="bg-amber-50 py-20">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow ring-1 ring-amber-900/10 p-6">
          <button onClick={onBackToShop} className="text-amber-700 hover:underline mb-4">← Continua lo shopping</button>
          <h2 className="text-2xl font-semibold text-amber-900">Checkout</h2>
          <ul className="mt-4 divide-y divide-amber-900/10">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-amber-900 font-medium">{product.name} × {qty}</p>
                  <p className="text-sm text-amber-800/70">€ {(product.price * qty).toFixed(2)}</p>
                </div>
                <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 text-right">
            <p className="text-sm text-amber-800/80">Subtotale: € {order.subtotal.toFixed(2)}</p>
            {surcharge > 0 && (
              <p className="text-sm text-amber-800/80">Supplemento Sardegna: € {surcharge.toFixed(2)}</p>
            )}
            <p className="text-lg font-semibold text-amber-900">Totale: € {total.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow ring-1 ring-amber-900/10 p-6">
          <h3 className="text-xl font-semibold text-amber-900">Dati di spedizione</h3>
          <div className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-900">Numero di telefono</label>
              <input name="phone" required value={form.phone} onChange={onChange} className="mt-1 w-full rounded-lg border-amber-200 focus:border-amber-400 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900">Indirizzo di spedizione</label>
              <input name="address" required value={form.address} onChange={onChange} className="mt-1 w-full rounded-lg border-amber-200 focus:border-amber-400 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900">Provincia (sigla es. CA, SS)</label>
              <input name="province" required value={form.province} onChange={onChange} className="mt-1 w-full rounded-lg border-amber-200 focus:border-amber-400 focus:ring-amber-400 uppercase" />
            </div>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-amber-900">Pagamento</h3>
          <div className="mt-2" ref={paypalRef} />
          <p className="mt-2 text-sm text-amber-800/70">Pagamento protetto tramite PayPal. L'addebito sarà di € {total.toFixed(2)}.</p>
        </div>
      </div>
    </section>
  );
}
