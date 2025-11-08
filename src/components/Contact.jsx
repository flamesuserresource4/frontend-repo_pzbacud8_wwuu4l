import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contatti" className="bg-amber-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-amber-900 text-center">
          Contatti
        </h2>
        <p className="mt-2 text-center text-amber-800/80">
          Scrivici per informazioni, ordini speciali o collaborazioni.
        </p>

        <form onSubmit={onSubmit} className="mt-8 bg-white rounded-2xl shadow ring-1 ring-amber-900/10 p-6 grid gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">Nome</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Messaggio</label>
            <textarea
              name="message"
              required
              rows="4"
              value={form.message}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
          <button type="submit" className="rounded-full bg-amber-700 text-amber-50 px-6 py-3 font-medium shadow hover:bg-amber-800">
            Invia messaggio
          </button>
          {sent && (
            <p className="text-green-700">Grazie! Ti risponderemo al più presto.</p>
          )}
        </form>
      </div>
    </section>
  );
}
