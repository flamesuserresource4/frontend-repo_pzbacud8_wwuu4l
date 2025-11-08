import { useRef, useState } from "react";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import About from "./components/About";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

function App() {
  const productsRef = useRef(null);
  const [order, setOrder] = useState(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGoToCheckout = ({ cart, subtotal }) => {
    setOrder({ cart, subtotal });
    // smooth scroll to top where checkout starts
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToShop = () => setOrder(null);

  return (
    <div className="font-[Inter] bg-amber-50 text-amber-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-amber-50/70 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#" className="text-lg font-semibold">Calzoncelli RaffSacc</a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#products" className="hover:underline">Prodotti</a>
            <a href="#about" className="hover:underline">Chi siamo</a>
            <a href="#contatti" className="hover:underline">Contatti</a>
          </nav>
        </div>
      </header>

      {!order && (
        <>
          <Hero onScrollToProducts={scrollToProducts} />
          <div ref={productsRef}>
            <Shop onGoToCheckout={handleGoToCheckout} />
          </div>
          <About />
          <Contact />
        </>
      )}

      {order && <Checkout order={order} onBackToShop={backToShop} />}

      <Footer />
    </div>
  );
}

export default App;
